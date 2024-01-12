import mongoose, {Schema} from "mongoose";

const dummy = {
    "2024": { // year
      "2": { // weekno
        daystart: 540,// Number,
        dayend: 1080, // Number
        weekdata: [
          {
            weekday: 0,
            date: '08-01-2024',
            eventsList: [
             {
                id: 0,
                type: 'event',
                label: 'Task 1',
                color: 'color-14',
                start: 570,//minutes format
                value: '1',
                duration: 60,
                isDone: false,
                tag: 'basic'
              },
              {
                id: 1,
                type: 'event',
                label: 'Task 2',
                color: 'color-13',
                start: 950,//minutes format
                value: '1',
                duration: 60,
                isDone: false,
                tag: 'basic'
              }, 
            ]
          }
        ]
      } 
    }
  }

const CalDataSchema = new Schema({
    obj: {type: Object, required:true, default: {"2024":{}}},
    created_at: {
        type: Date,
        default: Date.now,
      }
})

export const CalData = mongoose.model('CalData',CalDataSchema)