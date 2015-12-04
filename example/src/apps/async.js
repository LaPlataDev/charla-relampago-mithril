import m from 'mithril';


const asyncOne = (cb) => {
    setTimeout(cb, 1500);
};

const asyncTwo = (cb) => {
    setTimeout(cb, 1000);
};

const app = {
    controller() {
        this.asyncOneFinish = m.prop(false);
        this.asyncTwoFinish = m.prop(false);
        this.startOne = () => {
            m.startComputation(); // barrera 1
            asyncOne(() => {
                this.asyncOneFinish(true);
                m.endComputation();
            });
        };

        this.startTwo = () => {
            m.startComputation(); // barrera 2
            asyncTwo(() => {
                this.asyncTwoFinish(true);
                m.endComputation();
            });
        };

        this.startBoth = () => {
            // comienzan las dos operaciones async y hasta que no terminen las dos no se vuelve a renderizar la app
            this.startOne();
            this.startTwo();

        };
    },
    view(ctrl) {
        return m('.content', [

            m('.row', [
                m('.col-md-6', m('h2', {class: ctrl.asyncOneFinish() ? 'green' : 'red' }, 'async one')),
                m('.col-md-6', m('h2', {class: ctrl.asyncTwoFinish() ? 'green' : 'red' }, 'async two')),
            ]),

            m('button.btn.btn-primary', {onclick: ctrl.startOne}, 'START ONE'),
            m('button.btn.btn-success', {onclick: ctrl.startTwo}, 'START TWO'),
            m('button.btn.btn-warning', {onclick: ctrl.startBoth}, 'START BOTH')
        ]);
    }
};

export default app;
