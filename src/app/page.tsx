import React from "react";
import {Button,Input} from 'antd'

function HomePage() {
  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1 className="font-bold">HomePage</h1>
      <Button type="primary">
        Primary Button 
      </Button>
      <Button  type="default">
        Default Button
        </Button>
       <Input 
        placeholder ="Basic input"        
       /> 
    </div>
  );
}

export default HomePage;
