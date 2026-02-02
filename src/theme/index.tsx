import React from 'react'
import { ConfigProvider } from 'antd'

function AntDesignTheme({children}: {children: React.ReactNode}) {
  const primaryCOlor = '#42264C'; 
    
  return <ConfigProvider
  theme={{
    token: {
        colorPrimary: primaryCOlor,
        controlTmpOutline: 'none',
        borderRadius: 2,

    },
    components: {
        Button : {
           controlHeight : 45 
        },
        Input :{
           controlHeight : 45 
        }
    }
  }}
  >{children}</ConfigProvider>;
}


export default AntDesignTheme