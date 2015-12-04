import m from 'mithril';

const panel = {
    view(ctrl, props = {}) {
        return m('.panel.panel-default', [
            m('.panel-heading', props.title),
            m('ul.list-group',
                props.list.map(hero => m('li.list-group-item', hero))
            )
        ]);
    }
};

const app = {
    controller() {
        this.dc = m.prop([]);
        this.marvel = m.prop([]);

        m.request({url: '/data/dc.json'})
            .then(result => result.data)
            .then(this.dc);

        m.request({url: '/data/marvel.json'})
            .then(result => result.data)
            .then(this.marvel);
    },
    view(ctrl) {
        return m('.row', [
            m('.col-md-6', m.component(panel, { title: 'DC', list: ctrl.dc() })),
            m('.col-md-6', m.component(panel, { title: 'Marvel', list: ctrl.marvel() })),
        ]);
    }
};

export default app;
