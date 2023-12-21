var yandex_function_url = 'https://functions.yandexcloud.net/d4esufm5bai4jt5l41at'

// ����� ��� ����������� ������� python � �������������� js ������
function preconvert_json(string) {
    let json = string.split('\'').join("\"");
    return json.split('b\"').join("\"");
}

// �����, ������� ����� ��������� ������� ���������� �������
function update_car_list(data) {
    $("#art_table td").parent().remove();
    let received_cars = JSON.parse(preconvert_json(data));
    if (received_cars.length > 0) {
        for (let i = 0; i < received_cars.length; ++i) {
            // ������� ������ ������ ��� ������ ��������� ��������
            let art = new Art(received_cars[i]);
            // ��������� ����� �������� �� ID, �������� �� ���� ���������
            // ������� � ����� tr - table row
            $('#art_table tr:last').after(art.to_table_entry());
            console.log(received_cars[i]);
        }
        $("#art_table").show();
    } else {
        output_error("Incorrect data received")
    }
}
function update_autors_list(data) {
    let received_cars = JSON.parse(preconvert_json(data));
    if (received_cars.length > 0) {
        for (let i = 0; i < received_cars.length; ++i) {
            console.log(received_cars[i].name);
            $('#categories').append($('<option>', {
                value: received_cars[i].name,
                text: received_cars[i].name
            }));
        }
        $("#art_table").show();
    } else {
        output_error("Incorrect data received")
    }
}

// �����, ������� ������� ��������� �� ������ � ������ � ����� ���� ������
function output_error(message, timeout = 2000) {
    $('.error_message').show();
    $('.error_message').text(message);
    setTimeout(function () {
        $('.error_message').hide();
    }, timeout);
}