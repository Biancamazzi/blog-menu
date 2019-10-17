const firebase = require("../firebase_site");
const stringify = require('csv-stringify');

const create = (data) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push(data);
    return lead
};

const csv = (cb) => {
    const leads = firebase.database().ref('leads');
    const data = [['email', 'nome', 'ip', 'tipo', 'data_hora']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead) => {
            const {name, email, ip, data_hora} = lead.val();
            data.push([email, name, ip, '', data_hora])
        });
        stringify(data, (err, output) => {
            cb(output);
        })
    })
};

module.exports = { 
    create, csv,
}