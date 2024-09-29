const mongoose = require('mongoose')
const cors = require('cors')
const dotenv =  require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const {Webhook} = require('svix')
const User = require('./models/userModel')
const app = express()


const ChatRoute = require('./routes/chat')
const ConsultRoute = require('./routes/consultation')
const ScheduleRoute = require('./routes/schedule')
const UserRoute = require('./routes/user')
const SpecialityRoute = require('./routes/speciality')




//connecting to mongodb atlas database (Cloud)
mongoose.connect('mongodb+srv://Larrien:qwerty123456@cluster0.u7xnpo6.mongodb.net/Telemedecine?retryWrites=true&w=majority')

dotenv.config();


app.post(
    '/api/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    async function (req, res) {
      try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;
  
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
  
        const { id, ...attributes } = evt.data;
  
        const eventType = evt.type;
        if (eventType === 'user.created') {
            console.log(`User ${id} was ${eventType}`);
            console.log(attributes);
            const email = attributes.email_addresses[0].email_address;
            const firstName = attributes.first_name;
            const lastName = attributes.last_name;
		      
    	
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
        username: `${firstName} ${lastName}`, 
        title: '', 
        location: '',
        email,
        phone: '', 
        speciality: '', 
        description: '',
        review: []
			})
			console.log('User saved to database');
			await user.save()
		
        }
        res.status(200).json({
          success: true,
          message: 'Webhook received',
        });
      } catch (err) {
        console.log(err)
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
  );


//middlewares
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))


//avoid cors errors
app.use(cors())


// routes
app.use('/user', UserRoute)
app.use('/speciality', SpecialityRoute)
app.use('/consult', ConsultRoute)
app.use('/schedule', ScheduleRoute)
app.use('/chat', ChatRoute)




//in case route is not available
app.use((req, res)=>{
    const error = new Error('page not found')
    error.message = 'page not found !'
    res.status(500).json({error : {msg: error.message}})
})

module.exports = app