// Make a Bounce(int i) method which count with your parameter from 10 to 0 and then back to 10


function Bounce(intToCount){

    const remInt = intToCount;
    for (let i = intToCount; intToCount >= 0 ; intToCount--){
        console.log(intToCount);
        if (intToCount === 0){
         for (let i = 0; i <= remInt ; i++){
            console.log(i);
        }
      
    }
}}

Bounce(15);
