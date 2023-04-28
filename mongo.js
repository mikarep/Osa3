const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.qkf88u2.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length==3) {
  console.log('argv == 3')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length==5) {
  console.log('argv == 5')
  const nimi = process.argv[3]
  const numero = process.argv[4]

  const person = new Person({
    name: nimi,
    number: numero,
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}