const  exec  = require("child_process").execSync;
const fs = require('fs')

//Must be same as 
let palcesName = ['J',"Charminar"]
palcesName.reverse()

 let filess = fs.readdirSync("../")

 let videoList = ""

filess.forEach(name => {
    let placeTextCount = 0
    if (name.endsWith(".jpg"))
    {
        let fName = name.split('.')[0]
        exec(`cd ../ && convert ${name} -resize 1920x1080! ${fName}1.jpg`)

        exec(`cd ../ && ffmpeg -i ${fName}1.jpg  -r 1/5 ${fName}.mp4`)
        exec(`cd ../ && ffmpeg -i ${fName}.mp4 -vf "drawtext=fontfile=/path/to/font.ttf:text='${palcesName.pop()}':fontcolor=white:fontsize=120:box=1:boxcolor=black@0.5:boxborderw=40:x=(w-text_w)/2:y=h-th-100" ff${fName}.mp4`)
        videoList += `file ff${fName}.mp4\n`

    }
})

fs.writeFileSync('../videos.txt',videoList)
exec(`cd ../ && ffmpeg -f concat -i videos.txt -c copy output8.mp4`)



/*exec("ext.bat", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    
});*/

