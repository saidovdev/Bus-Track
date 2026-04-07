import driverModels from "../models/driverModels.js";

export const getDriverData=async(req,res)=>{
    try {
        const driverID=req.driver.id
        if(!driverID){
            return res.status(401).json({message:"Unathorized"})
        }
        const driverData=await driverModels.findById(driverID)
        if(!driverData){
            return res.status(404).json({message:"Driver not found"})
            
        }
        return res.status(200).json({data:driverData,message:"Driver data sended successfully"})
    } catch (error) {
        console.log("Error ocured while geting driver data",error);
        return res.status(500).json({error:'Internal server error'})
        
    }
}