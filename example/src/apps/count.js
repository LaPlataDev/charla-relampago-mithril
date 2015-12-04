import m from 'mithril';

const app = {
    controller() {
        this.count = m.prop(0);
        this.inc = () => {
            this.count(this.count() + 1);
        };
        this.dec = () => {
            this.count(this.count() - 1);
        };
    },
    view(ctrl) {
        return m('.content', [
            m('h2', `Count: ${ctrl.count()}`),
            m('button.btn.btn-success', {onclick: ctrl.inc}, 'INC'),
            m('button.btn.btn-warning', {onclick: ctrl.dec}, 'DEC'),
        ]);
    }
};

export default app;
