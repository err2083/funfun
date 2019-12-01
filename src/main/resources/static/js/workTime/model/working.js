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

            this.workTime = this.todayWorkingModel.workTime;
            this.workStartTime = moment(this.workTime.from, 'HH:mm:ss');
            this.workEndTime = moment(this.workTime.to, 'HH:mm:ss');
            this.restTime = this.todayWorkingModel.restTime;
            this.restStartTime = moment(this.restTime.from, 'HH:mm:ss');
            this.restEndTime = moment(this.restTime.to, 'HH:mm:ss');
            this.restDurationTime = this.restEndTime.diff(this.restStartTime, 'seconds');
            this.workDurationTime = this.workEndTime.diff(this.workStartTime, 'seconds') - this.restDurationTime;

            var workAndRestMinuteModel = this.todayWorkingModel.workAndRestMinuteModel;
            this.set({workSec : workAndRestMinuteModel.workMinute * 60,
                restSec : workAndRestMinuteModel.restMinute * 60,
                secIncreaseMoney : this.minuteIncreaseMoney / 60,
                earningMoney : this.minuteIncreaseMoney * workAndRestMinuteModel.workMinute
            });

            this.on({
                "change:workSec" : this.calculateWeek,
                "change:restSec" : this.calculateRest
            });
        },

        url : function(){
            return /working/ + this.id;
        },

        getDataToJson : function(){
            return this.toJSON();
        },

        settingData : function(){
            //todo 서버시간이랑 프론트 시간의 갭이 있으므로 프론트 시간으로 다시 갱신해야함 or 서버에 다시보내기\

            if(this.isWeekend()){
                this.set({earningMoney : 0, workSec : 0, restSec : 0});
            } else if(this.isWorkTime()){
                this.set({earningMoney : this.get('earningMoney') + this.localTime.seconds() * this.get('secIncreaseMoney'),
                    workSec : this.get('workSec') + this.localTime.seconds()});
            } else if(this.isRestTime()){
                this.set({restSec : this.get('restSec') + this.localTime.seconds()});
            }

            this.trigger('change:restSec');
            this.trigger('change:workSec');
        },

        isWeekend: function(){
            // return this.monthWorkingModel.weekend;
            return false;
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
            //시간이 출근시간보다 뒤일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if (pivotTime.diff(this.workStartTime) < 0) {
                return true;
            }
            return false;
        },

        isBeforeWorkTime: function () {
            //서버시간이 퇴근시간보다 뒤일때
            var pivotTime = moment().set({hours: this.localTime.hours(), minutes: this.localTime.minutes()});

            if (pivotTime.diff(this.workEndTime) >= 0) {
                return true;
            }
            return false;
        },

        calculateWeek : function () {
            this.set({leftWorkSec : this.workDurationTime - this.get('workSec'),
                earningMoney : this.get('earningMoney') + this.get('secIncreaseMoney')});
        },

        calculateRest : function(){
            this.set({leftRestSec : this.restDurationTime - this.get('restSec')});
        }
    });

    return Model;
});