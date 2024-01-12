import { CalData } from "../models/CalData.js"

export async function generateNewCalData() {
    const newObj = new CalData()
    await newObj.save()
    return newObj._id.toString()
}

export async function saveCalData(dataId, year, weekno, data) {

    //get user dataId
    let key = 'obj.'+year+'.'+weekno
    // let val = await CalData.findById(dataId)
    await CalData.findByIdAndUpdate(dataId, {$set: {[key]: data}}, {upsert: true})
    // data.obj = obj
}