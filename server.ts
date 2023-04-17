import express, { Request, Response } from 'express'
import axios, {AxiosResponse} from 'axios'
import {QuizData} from './interfaces'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 8000



app.get('/quiz-item', async (req: Request, res: Response) => {

    try {
        // @ts-ignore
        const response: AxiosResponse = await axios.get(process.env.URL, {
            headers: {
                'X-Cassandra-Token': process.env.TOKEN,
                accept: 'application/json'
            }
        })

        if (response.status === 200){
            const quizItem: QuizData = await response.data.data['30f7495a-454d-4f39-9b46-2123ae64dc39']
            
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            
            res.send(quizItem)
        }      
        
        }    catch(err){
            console.error(err + 'error fetching and reciving data, check your server.ts file') 
  }  

})





app.listen(PORT, () => console.log('server is running on ' + PORT))