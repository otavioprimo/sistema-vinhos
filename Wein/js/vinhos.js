var vinhos;
var vinho_ativo; //posição do vinho dentro json quando se ativa a modal
var imageUploadedPath = '';
var imageUploadedPathUpdate = '';

var uploadFile;
var uploadFile2;
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'http://localhost/apiWines/api/wines',
        dataType: 'json',
        data: '{"comment"}',
        success: function (data) {
            vinhos = data;
            // console.log(vinhos);
            carregarCard();
        }
    });

    uploadFile = $("#fileuploader").uploadFile({
        url: "http://localhost/apiWines/Wein/img/uploadedImages/upload.php",
        fileName: "file",
        maxFileCount: 1,
        returnType: 'json',
        multiple: false,
        dragDrop: false,
        allowedTypes: "jpg,png",
        onSuccess: function (files, data, xhr, pd) {
            if (data.error) alert(data.message);
            else imageUploadedPath = data.fileName;
        }
    });

    uploadFile2 = $("#fileuploader2").uploadFile({
        url: "http://localhost/apiWines/Wein/img/uploadedImages/upload.php",
        fileName: "file",
        maxFileCount: 1,
        returnType: 'json',
        multiple: false,
        dragDrop: false,
        allowedTypes: "jpg,png",
        onSuccess: function (files, data, xhr, pd) {
            if (data.error) alert(data.message);
            else imageUploadedPathUpdate = data.fileName;
        }
    });


});

//CARREGA CARDS
function carregarCard() {
    console.log(vinhos);
    $(".card").remove();

    for (i = 0; i < vinhos.length; i++) {
        var card = '<div class="card" id="vinho-card" onclick="openModalVinho(' + i + ')">' +
            '<div class="img-content">' +
            '<div class="img-ef">' +
            '<img src="img/uploadedImages/' + vinhos[i].picture + '">' +
            '</div>' +
            '</div>' +
            '<div class="card-content">' +
            '<h4>' + vinhos[i].name + '</h4>' +
            '<p>' + vinhos[i].country + '' +
            '<br/>' + vinhos[i].region + '' +
            '<br/>' + vinhos[i].year + '' +
            '</div>' +
            '</div>';

        $("#main-section").append(card);
    }

}

//MODAL VINHO
function openModalVinho(id) {
    vinho_ativo = id;

    $("#modalVinho").modal('show');
    $('#modalNome').text(vinhos[id].name);
    $('#modalPais').text(vinhos[id].country);
    $('#modalRegiao').text(vinhos[id].region);
    $('#modalAno').text(vinhos[id].year);
    $('#modalUva').text(vinhos[id].grape);
    $('#modalDescricao').text(vinhos[id].description);
    $('#imgModal').attr("src", "img/uploadedImages/" + vinhos[id].picture);
}

//DISMISS MODAL NOVO VINHO
$('#dismiss-modal-nvinho').click(function () {
    $('#novoVinho').modal('hide');
    imageUploadedPath = '';
    uploadFile.reset();
});

//NOVO VINHO
$('#btn-nvinho').click(function () {
    var novovinho = {
        name: $('#nome').val(),
        grapes: $('#uva').val(),
        country: $('#pais').val(),
        region: $('#regiao').val(),
        year: $('#ano').val(),
        description: $('#descricao').val(),
        picture: imageUploadedPath
    };


    $.ajax({
        type: 'POST',
        url: 'http://localhost/apiWines/api/wines',
        dataType: 'json',
        data: novovinho,
        success: function (data) {
            alert('Vinho Cadastrado Com Sucesso!');
            window.location.reload();
        }
    });
});

$('#dismiss-modal-altvinho').click(function () {
    $('#altVinho').modal('hide');
    imageUploadedPathUpdate = '';
    uploadFile2.reset();
});

// ALTERAR VINHO
$('#btn-alterar').click(function () {
    $("#modalVinho").modal('hide');

    $('#altnome').val(vinhos[vinho_ativo].name);
    $('#altuva').val(vinhos[vinho_ativo].grapes);
    $('#altpais').val(vinhos[vinho_ativo].country);
    $('#altregiao').val(vinhos[vinho_ativo].region);
    $('#altano').val(vinhos[vinho_ativo].year);
    $('#altdescricao').val(vinhos[vinho_ativo].description);

    $("#altVinho").modal('show');
});

$('#btn-altvinho').click(function () {
    var altvinho = {
        name: $('#altnome').val(),
        grapes: $('#altuva').val(),
        country: $('#altpais').val(),
        region: $('#altregiao').val(),
        year: $('#altano').val(),
        description: $('#altdescricao').val(),
        picture: imageUploadedPathUpdate
    }

    $.ajax({
        type: 'PUT',
        dataType: 'json',
        data: altvinho,
        url: 'http://localhost/apiWines/api/wines/' + vinhos[vinho_ativo].id,
        success: function (data) {
            // console.log(data);
            window.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
});


// EXCLUIR VINHO
$('#btn-excluir').click(function () {
    if (confirm('Deseja Excluir Este Vinho?')) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost/apiWines/api/wines/' + vinhos[vinho_ativo].id,
            dataType: 'json',
            success: function () {
                alert('Vinho Excluido Com Sucesso!');
                window.location.reload();
                vinho_ativo = 0;
            }
        });
    } else {

    }
});





