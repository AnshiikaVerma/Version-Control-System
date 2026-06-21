import React,{useEffect,useState} from "react";
import HeatMap from "@uiw/react-heat-map";

//function to generate dummy data->generate random activity

const generateActivityData=(startDate,endDate)=>{
    const data=[];
    let currentData=new Date(startDate);
    console.log(currentData);
    const end=new Date(endDate);
while(currentData<=end){
    const count=Math.floor(Math.random()*50); //0-50 count
    data.push({
       date:currentData.toISOString().split('T')[0],  //date
        count:count,
        })
        currentData.setDate(currentData.getDate()+1);
}
return data;
};
const getPanelColors=(maxCount)=>{
    const colors={}; //maxcount->how many shades we want
    for( let i=0;i<=maxCount;i++){
        const currGreenVal= Math.floor((i/maxCount)*255); 
        colors[i]=`rgb(0 ,${currGreenVal} ,0)`; //green shades
    }
    return colors;
};




const HeatMapProfile=()=>{
const [activityData,setActivityData]=useState([]);
const [panelColors,setPanelColors]=useState({}); //set h thats why curly bracket clr shade not repeat

useEffect(()=>{
    const fetchData=async()=>{
        const startDate='2025-01-01';
        const endDate='2025-12-31';
        const data=generateActivityData(startDate,endDate);
        setActivityData(data);
        const maxCount=Math.max(...data.map((d)=>d.count)); ///no of shades
        setPanelColors(getPanelColors(maxCount));
    }
fetchData();
},[]);



//frontend
return(
    <div>
        <h4>Recent Contributions</h4>

        <div className="contribution-card">
    <h3>Contributions in 2025</h3>

    

       <HeatMap
        className="HeatMapProfile"
        // style={{maxWidth:"1000px",height:"1000px",color:"white"}}
         style={{
      width: "100%",
       minWidth:"1000px",
  maxWidth: "900px",
      display: "flex",
      justifyContent: "center",
      color:"white"
    }}
        value={activityData}
        weekLabels={['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}
        monthLabels={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]}
        startDate={new Date("2025-01-01")}
          endDate={new Date("2025-12-31")}
        rectSize={18} //15
        space={4} //3
        rectProps={{
            rx:2.5,   // 2.5 horizontal size of colors
        }}
        panelColors={panelColors}
        >
          
       </HeatMap>

       </div>
    </div>
)

}


export default HeatMapProfile;





