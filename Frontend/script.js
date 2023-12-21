var yandex_function_url = 'https://functions.yandexcloud.net/d4esufm5bai4jt5l41at'

// Метод для конвертации формата python в воспринимаемую js строку
function preconvert_json(string) {
    let json = string.split('\'').join("\"");
    return json.split('b\"').join("\"");
}

// Метод, который будет заполнять таблицу пришедшими данными
function update_car_list(data) {
    $("#art_table td").parent().remove();
    let received_cars = JSON.parse(preconvert_json(data));
    if (received_cars.length > 0) {
        for (let i = 0; i < received_cars.length; ++i) {
            // Создаем объект класса для каждой пришедшей сущности
            let art = new Art(received_cars[i]);
            // Выполняем поиск элемента по ID, выбираем из него последний
            // элемент с тегом tr - table row
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

// Метод, который покажет сообщение об ошибке и скроет её через пару секунд
function output_error(message, timeout = 2000) {
    $('.error_message').show();
    $('.error_message').text(message);
    setTimeout(function () {
        $('.error_message').hide();
    }, timeout);
}