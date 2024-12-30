import React from "react"
import { analytics } from "../config"

class Html extends React.Component {
 render() {
  const { title, description, styles, scripts, children } = this.props
  return (
   <html className='no-js' lang='en'>
    <head>
     <meta charSet='utf-8' />
     <meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />

     <title>{title || "HeyCare"}</title>
     <link rel='icon' href='/images/logo.png' />
     <link href='/css/bootstrap.css' rel='stylesheet' />
     <link href='/css/style.css' rel='stylesheet' />
     <link href='/css/toastr/toastr.min.css' rel='stylesheet' />
     <link href='/font-awesome/css/font-awesome.css' rel='stylesheet' />
     <link href='/penguin-icon/bold/style.css' rel='stylesheet' />
     <link href='/penguin-icon/linear/style.css' rel='stylesheet' />
     <link
      rel='stylesheet'
      href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
      integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
      crossOrigin=''
     />
     {/* <link
        rel="/orgchart/css/jquery.orgchart.min.css"
      /> */}
     <link rel='preconnect' href='https://fonts.googleapis.com' />
     <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
     <link href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap' rel='stylesheet' />
     {(styles || []).map((style) => (
      <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />
     ))}
     <script src='/js/jquery-3.7.1.js'></script>
     <script src='/js/bootstrap.min.js'></script>
    </head>
    <body>
     <div id='app' dangerouslySetInnerHTML={{ __html: children }} />

     {(scripts || []).map((script) => (
      <script key={script} src={script} />
     ))}
    </body>
   </html>
  )
 }
}

export default Html
