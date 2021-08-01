module.exports.getEquipmentName = (name) => {
    let namestr = "";
    switch (name) {
        case 'e1':
            namestr = 'Equipment1'
            break;

        case 'e2':
            namestr = 'Equipment2'
            break;

        case 'e3':
            namestr = 'Equipment3'
            break;

        case 'e4':
            namestr = 'Equipment4'
            break;
    }
    return namestr;
};