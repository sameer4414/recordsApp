const Hapi = require('hapi')
const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/recordsdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log(err))

//create record model
const Record = mongoose.model('Record', { text: String })

const init = async () => {
  //Init server
  const server = new Hapi.server({
    port: 8000,
    host: 'localhost'
  })

  await server.register(require('inert'))
  await server.register(require('vision'))

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => h.view('index', { name: 'Sameer Srivastava' })
  })

  //Get record route
  server.route({
    method: 'GET',
    path: '/records',
    handler: async (req, h) => {
      let records = await Record.find((err, records) => {
        console.log(records)
      })
      return h.view('records', {
        records: records
      })
    }
  })

  //Post records route
  server.route({
    method: 'POST',
    path: '/records',
    handler: async (req, h) => {
      let text = req.payload.text
      let newRecord = new Record({ text: text })
      await newRecord.save((err, record) => {
        if (err) return console.log(err)
      })

      return h.redirect().location('records')
    }
  })

  server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: (req, h) => {
      return `Hello world, ${req.params.name}`
    }
  })

  server.route({
    method: 'GET',
    path: '/about',
    handler: (req, h) => {
      return h.file('./public/about.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/image',
    handler: (req, h) => {
      return h.file('./public/records.jpg')
    }
  })

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  })

  await server.start()

  console.log(`Server is running on ${server.info.uri}`)
}

init().catch(err => console.log(err))