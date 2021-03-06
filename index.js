const fs = require('fs');

// For the purpose of this exeresice, as the input.txt file is small,
// I have read the whole file in memory.
// For production use, I would read the file line by line
const filePath = process.argv[2];
const inputData = fs.readFileSync(filePath).toString().split("\n");

const room = {x: parseInt(inputData[0].split(" ")[0]), y: parseInt(inputData[0].split(" ")[1])};
const robot = {x: parseInt(inputData[1].split(" ")[0]), y: parseInt(inputData[1].split(" ")[1])};
const directions = inputData[inputData.length -1];
let  dirtPatchesCleaned = 0

const dirtPatches = inputData.slice(2,inputData.length-1).map( dirt => {
    let eachDirt = dirt.split(" ");
    let dirtPatch = {x:0, y:0};
    dirtPatch.x = parseInt(eachDirt[0]);
    dirtPatch.y = parseInt(eachDirt[1]);
    return dirtPatch;
});

const moveRobot = directions => {
    directions.split("").forEach(direction => {
        switch(direction) {
            case "N":
            robot.y != room.y ? robot.y += 1 : robot.y;
            break;
            case "E":
            robot.x != room.x  ? robot.x += 1 : robot.x;
            break;
            case "S":
            robot.y != room.y ? robot.y -= 1 : robot.y;
            break;
            case "W":
            robot.x != room.x ? robot.x -= 1 : robot.x;
            break;
        }
        cleanDirt(dirtPatches);
    });
};

const cleanDirt = dirtPatches => {
    dirtPatches.forEach(dirtPatch => {
        if(robot.x === dirtPatch.x && robot.y === dirtPatch.y) {
            dirtPatchesCleaned++;
            dirtPatch.x = null;
            dirtPatch.y = null;
        }
    });
};

moveRobot(directions);

console.log(robot);
console.log(dirtPatchesCleaned);
