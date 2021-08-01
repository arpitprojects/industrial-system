const equipmentData = require('./data.json');

const readline = require("readline");

const { getEquipmentName } = require('./utils/nameFormat');

class IndustrialEquipment {
    constructor() {
        this.rdInstance = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    getQuestions(theQues) {
        return new Promise(resolve => this.rdInstance.question(theQues, answer => resolve(answer)))
    }

    async callTheQuestions() {
        this.equipmentName = this.validateEquipmentName(await this.getQuestions("Enter the equipment name: "));
        this.startTime = this.validateTime(await this.getQuestions("Enter the start time: "));
        this.endTime = this.validateTime(await this.getQuestions("Enter the end time: "));
        this.getTheResults();
    }

    validateEquipmentName(name) {
        const eqName = name.trim().toLowerCase();
        if (eqName !== "e1" && eqName !== "e2" && eqName !== "e3" && eqName !== "e4") {
            console.log('Please enter input between E1, E2, E3, E4, case insensitive!');
            this.callTheQuestions();
        }
        return name;
    }

    validateTime(time) {
        const timeRegex = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
        if (!timeRegex.test(time)) {
            console.log('Please input valid time format: [HH:MM]');
            this.callTheQuestions();
        }
        return time;
    }

    getTheResults() {
        let finalList = [];
        const eqName = getEquipmentName(this.equipmentName);
        const sensorList = equipmentData.EquipmentsMapping[eqName];
        sensorList.map(sensor => {
            if (this.timeBound(sensor.start_time, sensor.end_time)) {
                finalList.push(sensor);
            }
        });
        if (finalList.length != 0) {
            console.log(finalList);
            this.resetInputs();
            finalList = [];
            this.rdInstance.close();
            this.closeProgram();
        } else {
            console.log('\nNo overlaps found, Try again.\n');
            this.callTheQuestions();
        }
    }

    timeBound(start, end) {
        if ((this.getDateTimeObject(this.startTime) <= this.getDateTimeObject(end)) &&
            (this.getDateTimeObject(start) <= this.getDateTimeObject(this.endTime))) {
            return true;
        } else {
            return false;
        }
    }

    getDateTimeObject(time) {
        let today = new Date();
        let _t = time.split(":");
        today.setHours(_t[0], _t[1], 0, 0);
        return (today.getTime());
    }

    resetInputs() {
        this.equipmentName = '';
        this.startTime = "";
        this.endTime = "";
    }

    closeProgram() {
        console.log("\nThanks for checking.\n\n");
    }
}

module.exports = IndustrialEquipment;