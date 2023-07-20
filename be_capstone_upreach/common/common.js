export const formatResponse = (payload) =>{
    const formValue = payload.reduce(
        (currentValue, array ) =>{
            return{
                ...currentValue,
                Type_Id : [...new Set(array.map((e) => e.Type_Id))],
                Form_ID : [...new Set(array.map((e)=> e.Form_ID))],
                Topics_Id : [...new Set(array.map((e) => e.Topics_Id))],
                Location : [...new Set(array.map((e) => e.Location))]
            }
        },
        {}
    );
    return formValue;
}


