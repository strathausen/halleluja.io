const knex = require('knex')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const dbConfig = require('../knexfile')
const { pg_languages, unsupported } = require('./language_configurations')

const db = knex(dbConfig.development)

const sourcePath = path.resolve(__dirname, '..', '..', 'bible-json', 'json')

const replacements = [[/&#x27;/g, "'"]]

const editions = fs.readdirSync(sourcePath) // .slice(3, 4)

console.log(`reading ${editions.length} editions...`) // eslint-disable-line
Promise.mapSeries(editions, async (edition) => {
  try {
  const books = require(path.join(sourcePath, edition))
  const abbrev = path.basename(edition).replace(path.extname(edition), '')
  const [locale] = abbrev.split('_')
  if (unsupported.includes(locale)) {
    return
  }
  console.log(`starting work on edition ${edition}...`) // eslint-disable-line
  const pg_language = pg_languages[locale] || pg_languages.default
  const editionRow = { abbrev, locale, pg_language }
  const [edition_id] = await db('editions').insert(editionRow).returning('id')
  await Promise.map(books, async (book) => {
    const bookRow = { abbrev: book.abbrev, name: book.name, edition_id }

    const [book_id] = await db('books').insert(bookRow).returning('id')
    await Promise.map(book.chapters, async (verses, chapterIndex) => {
      const chapterRow = { book_id, index: chapterIndex + 1 }
      const [chapter_id] = await db('chapters').insert(chapterRow).returning('id')
      const verseRows = verses.map((content, verseIndex) => {
        replacements.forEach(([search, replace]) => {
          content = content.replace(search, replace)
        })
        return { index: verseIndex + 1, content, chapter_id }
      })
      await db.batchInsert('verses', verseRows)
    }, { concurrency: 10 })
  })
  console.log(`finished edition ${edition}.`) // eslint-disable-line
  } catch(e) {
    console.log(`there was a problem with ${edition}`, e.stack);
  }
}).then(async () => {
  console.log('refreshing indexes...') // eslint-disable-line
  await db.raw('REFRESH MATERIALIZED VIEW search_index')
  console.log('finished refreshing indexes.') // eslint-disable-line
  console.log('done.') // eslint-disable-line
  process.exit()
})
