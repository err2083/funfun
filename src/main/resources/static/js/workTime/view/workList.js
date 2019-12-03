define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workList.html',
    'mustache',
    'workTime/collection/working',
    'workTime/view/timeRun',
    'text!workTime/templates/registry.html',
    'workTime/model/working'
], function ($, _, Backbone, template, mustache, WorkingCollection, TimeRun, registryTemplate, Working) {

    var View = Backbone.View.extend({

        el: '#workTimeList',

        initialize: function () {
            this.collection = new WorkingCollection();
            // this.listenTo(this.collection,"add",this.render());
        },

        events: {
            "click .workTarget": "timeRun",
            'click #workTimeRegister': "OpenRegister",
            'click #workTimeRegister.open': "CloseRegister",
            "click #add": "addModel"
        },

        render: function () {
            this.collection.fetch({
                success: function (models) {
                    $('#workTimeList').html(mustache.render(template, {workTime: models.toJSON()}));
                }
            });
        },

        popup: function () {
            //모델이 동작중인 상황에 다른 모델을 누르면 시간 동기화가 안됨 대체방안-클릭막음
            //todo 팝업이 뜨는 동안 Interval 이벤트가 동작하지 않음
            alert("다른 타이머가 동작중입니다. 다시 실행시켜주세요");
        },

        OpenRegister: function () {
            var $button = this.$el.find('#workTimeRegister');
            $button.html('Register close');
            $button.addClass('open');

            this.$el.find('#registry').append(mustache.render(registryTemplate));
        },

        CloseRegister: function () {
            var $button = this.$el.find('#workTimeRegister');
            $button.html('Register open');
            $button.removeClass('open');
            this.$el.find('#registry').html('');
        },

        addModel: function (e) {
            e.preventDefault();

            var data = {};
            //todo data validate
            $('#addForm').children('input').each(function (i, el) {
                data[el.name] = el.value;
            });
            var model = new Working(data);
            model.save({wait: true});
            this.collection.add(model);

            //todo 다시 fetch가 안됨
            // this.render();
            alert("저장되었습니다");
            window.location.href = "#/home";
        },

        timeRun: function (event) {
            this.collection.fetch();
            this.undelegateEvents();
            this.delegateEvents({"click .workTarget": "popup"});

            var $target = $(event.currentTarget);
            var id = $target.find(".workId").text();
            var model = this.collection.findById(id);

            var timeRun = new TimeRun(model);
            timeRun.render();
        }
    });

    return View;
});