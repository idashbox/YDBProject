// �����������, ����������� ���� ����� �� ������� JSON
function Art(obj) {
    this.id_autor = obj.id;
    this.pic_name = obj.pic_name;
    this.name_autor = obj.name_autor;
}

// ���������� ������
Art.prototype = {
    constructor: Art,
    print: function () {
        console.log(this.to_string());
    },
    to_string: function () {
        return "Id Autor: " + this.id_autor + ", Name: " + this.name_autor + ", Name picture: " + this.pic_name;
    },
    // ������������ ����� �����, ������������ ��������������� ���� ������
    // <tr>...</tr> - ������ ������, table row
    // <td>...</td> - ������� �� ����������� ������� � ������
    to_table_entry: function () {
        return '<tr><td>' +
            this.id_autor + '</td><td>' +
            this.name_autor + '</td><td>' +
            this.pic_name + '</td></tr>'
    }
}