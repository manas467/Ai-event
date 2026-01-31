import { useMutation, useQuery } from "convex/react"
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useConvexQuery = (query, ...args) => {
    const result=useQuery(query,...args);

    const [data,setData]=useState(undefined);
    const[isLoading,setIsLoading]=useState(true);
    const[error,setError]=useState(null);


useEffect(()=>{
    if(result===undefined){
        setIsLoading(true);
  
} else{
    try {
       setData(result);
       setError(null); 
    } catch (err) {
        setError(err);
        toast.error(err.message);
    }finally{
        setIsLoading(false);
    }
}

   
},[result]);

return{
    data,
    isLoading,
    error
}

};




export const useConvexMutation = (mutation, ...args) => {
    const mutationfn=useMutation(mutation);

    const [data,setData]=useState(undefined);
    const[isLoading,setIsLoading]=useState(true);
    const[error,setError]=useState(null);



   const mutate=async(...Args)=>{
    
    setIsLoading(true);
    setError(null);


    try {
        setData(result);
        setError(null); 
     } catch (err) {
         setError(err);
         toast.error(err.message);
     }finally{
         setIsLoading(false);
     }
   
   };


   return {mutate,data,isLoading,error}





};