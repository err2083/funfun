define([
    'jquery',
    'underscore',
    'backbone',
    'moment'
    ],function($, _, Backbone, moment){

    var Model = Backbone.Model.extend({

        initialize : function(data){
            this.id = data.id;
            this.earnedMoney = data.earnedMoney;
            this.minuteIncreaseMoney = data.minuteIncreaseMoney;
            this.salary = data.salary;
            this.weekWorkingTime = data.weekWorkingTime;
            this.monthWorkingModel = data.monthWorkingModel;
            this.todayWorkingModel = data.todayWorkingModel;
            this.localTime = moment(data.todayWorkingModel.localTime, 'HH:mm:ssZ');
        },

        url : function(){
            return /working/ + this.id;
        },

        getDataToJson : function(){
            return this.toJSON();
        },

        settingData : function(){
            var workAndRestMinuteModel = this.todayWorkingModel.workAndRestMinuteModel;
            this.set({workSec : workAndRestMinuteModel.workMinute * 60,
                restSec : workAndRestMinuteModel.restMinute * 60,
                secIncreaseMoney : this.minuteIncreaseMoney / 60,
                earningMoney : this.minuteIncreaseMoney * workAndRestMinuteModel.workMinute});

            if(this.isWorkTime()){
                this.set({earningMoney : this.get('earningMoney') + this.localTime.seconds() * this.secIncreaseMoney,
                    workSec : this.get('workSec') + this.localTime.seconds()});
            } else if(this.isRestTime()){
                this.set({restSec : this.get('restSec') + this.localTime.seconds()});
            }

            var workTime = this.todayWorkingModel.workTime;
            var workStartTime = moment(workTime.from, 'HH:mm:ss');
            var workEndTime = moment(workTime.to, 'HH:mm:ss');
            var restTime = this.todayWorkingModel.restTime;
            var restStartTime = moment(restTime.from, 'HH:mm:ss');
            var restEndTime = moment(restTime.to, 'HH:mm:ss');

            var restDurationTime = restEndTime.diff(restStartTime, 'seconds');
            var workDurationTime = workEndTime.diff(workStartTime, 'seconds') - restDurationTime;
            this.set({leftRestSec : restDurationTime - this.get('restSec'),
                leftWorkSec : workDurationTime - this.get('workSec')});
        },

        isWeekend: function(){
            return this.monthWorkingModel.weekend;
        },

        isWorkTime: function () {
            //시간이 출근시간 이후 휴식시작 시간 이전, 휴식시작시간 이후 퇴근시간 이전
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});
            var workTime = this.todayWorkingModel.workTime;
            var workStartTime = moment(workTime.from, 'HH:mm:ss');
            var workEndTime = moment(workTime.to, 'HH:mm:ss');
            var restTime = this.todayWorkingModel.restTime;
            var restStartTime = moment(restTime.from, 'HH:mm:ss');
            var restEndTime = moment(restTime.to, 'HH:mm:ss');

            if ((pivotTime.diff(workStartTime) >= 0 && pivotTime.diff(restStartTime) < 0) ||
                (pivotTime.diff(restEndTime) >= 0 && pivotTime.diff(workEndTime) < 0)) {
                return true;
            }
            return false;
        },

        isRestTime: function () {
            //시간이 휴식시간 사이일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});
            var restTime = this.todayWorkingModel.restTime;
            var restStartTime = moment(restTime.from, 'HH:mm:ss');
            var restEndTime = moment(restTime.to, 'HH:mm:ss');

            if (pivotTime.diff(restStartTime) >= 0 && pivotTime.diff(restEndTime) < 0) {
                return true;
            }
            return false;
        },

        isAfterWorkTime: function () {
            //시간이 출근시간보다 뒤일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});
            var workTime = this.todayWorkingModel.workTime;
            var workStartTime = moment(workTime.from, 'HH:mm:ss');

            if (pivotTime.diff(workStartTime) < 0) {
                return true;
            }
            return false;
        },

        isBeforeWorkTime: function () {
            //서버시간이 퇴근시간보다 뒤일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});
            var workTime = this.todayWorkingModel.workTime;
            var workEndTime = moment(workTime.to, 'HH:mm:ss');

            if (pivotTime.diff(workEndTime) >= 0) {
                return true;
            }
            return false;
        }
    });

    return Model;
});