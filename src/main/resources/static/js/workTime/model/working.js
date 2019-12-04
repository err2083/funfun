define([
    'jquery',
    'underscore',
    'backbone',
    'moment'
], function ($, _, Backbone, moment) {

    var Model = Backbone.Model.extend({

        initialize: function (data) {
            this.set({
                salary: data.salary,
                salaryDay: data.salaryDay,
                weekWorkingDay: data.weekWorkingDay,
                weekWorkingTime: data.weekWorkingTime,
                startWorkTime: data.startWorkTime,
                endWorkTime: data.endWorkTime,
                startRestTime: data.startRestTime,
                endRestTime: data.endRestTime
            });

            this.on({
                "change:workSec": this.calculateWeek,
                "change:restSec": this.calculateRest
            });
        },

        url: function () {
            return "working";
        },

        //없어도 될것같다.
        getDataToJson: function () {
            return this.toJSON();
        },

        settingData: function () {
            this.earnedMoney = this.get('earnedMoney');
            this.minuteIncreaseMoney = this.get('minuteIncreaseMoney');
            this.salary = this.get('salary');
            this.weekWorkingTime = this.get('weekWorkingTime');
            this.monthWorkingModel = this.get('monthWorkingModel');
            this.todayWorkingModel = this.get('todayWorkingModel');
            this.localTime = moment(this.get('todayWorkingModel').localTime, 'HH:mm:ssZ');

            this.workTime = this.todayWorkingModel.workTime;
            this.workStartTime = moment(this.workTime.from, 'HH:mm:ss');
            this.workEndTime = moment(this.workTime.to, 'HH:mm:ss');
            this.restTime = this.todayWorkingModel.restTime;
            this.restStartTime = moment(this.restTime.from, 'HH:mm:ss');
            this.restEndTime = moment(this.restTime.to, 'HH:mm:ss');
            this.restDurationTime = this.restEndTime.diff(this.restStartTime, 'seconds');
            this.workDurationTime = this.workEndTime.diff(this.workStartTime, 'seconds') - this.restDurationTime;

            var workAndRestMinuteModel = this.todayWorkingModel.workAndRestMinuteModel;
            //todo 현재 초 단위 액수가 계산이 안되있는 상태
            this.set({
                workSec: workAndRestMinuteModel.workMinute * 60,
                restSec: workAndRestMinuteModel.restMinute * 60,
                secIncreaseMoney: this.minuteIncreaseMoney / 60,
                earningMoney: this.minuteIncreaseMoney * workAndRestMinuteModel.workMinute
            });

            if (this.isWeekend()) {
                this.set({earningMoney: 0, workSec: 0, restSec: 0});
            } else if (this.isWorkTime()) {
                this.set({
                    earningMoney: this.get('earningMoney') + this.localTime.seconds() * this.get('secIncreaseMoney'),
                    workSec: this.get('workSec') + this.localTime.seconds()
                });
            } else if (this.isRestTime()) {
                this.set({restSec: this.get('restSec') + this.localTime.seconds()});
            }

            this.trigger('change:restSec');
            this.trigger('change:workSec');
        },

        isWeekend: function () {
            return this.monthWorkingModel.weekend;
        },

        isWorkTime: function () {
            //시간이 출근시간 이후 휴식시작 시간 이전, 휴식시작시간 이후 퇴근시간 이전
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if ((pivotTime.diff(this.workStartTime) >= 0 && pivotTime.diff(this.restStartTime) < 0) ||
                (pivotTime.diff(this.restEndTime) >= 0 && pivotTime.diff(this.workEndTime) < 0)) {
                return true;
            }
            return false;
        },

        isRestTime: function () {
            //시간이 휴식시간 사이일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if (pivotTime.diff(this.restStartTime) >= 0 && pivotTime.diff(this.restEndTime) < 0) {
                return true;
            }
            return false;
        },

        isAfterWorkTime: function () {
            //퇴근후
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if (pivotTime.diff(this.workStartTime) >= 0) {
                return true;
            }
            return false;
        },

        isBeforeWorkTime: function () {
            //출근전
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if (pivotTime.diff(this.workEndTime) < 0) {
                return true;
            }
            return false;
        },

        calculateWeek: function () {
            var leftWork = this.secToHHMMSS(this.workDurationTime - this.get('workSec'));
            this.set({
                leftWork: leftWork,
                earningMoney: this.get('earningMoney') + this.get('secIncreaseMoney')
            });
        },

        calculateRest: function () {
            var leftRest = this.secToHHMMSS(this.restDurationTime - this.get('restSec'));
            this.set({leftRest: leftRest});
        },

        secToHHMMSS : function(sec){
            var hours   = Math.floor(sec / 3600);
            var minutes = Math.floor((sec - (hours * 3600)) / 60);
            var seconds = sec - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }
    });

    return Model;
});