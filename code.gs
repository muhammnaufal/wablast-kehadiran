function starsender(event){
    var sheet = SpreadsheetApp.getActiveSheet(); //sheet yang aktif atau lagi di buka
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();
    var rangeValues = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();  //mengambil value dari baris ke 2 hingga baris terakhir dan kolom ke 1 sampai kolom ke 11

    for(var i = 0; i < rangeValues.length; i++){  //bentuk perulangan selama i kurang dari range value 
    var rowData = rangeValues[i];
    var Name = rowData[0]; //Mengambil value kolom Nama atau kolom 1
    var Nickname = rowData[1]; //Mengambil value kolom Nama Panggilan atau kolom 2
    var Alpa = rowData[2]; //value alpha
    var Ijin = rowData[3]; //value ijin
    var Hadir = rowData[4]; //value hadir
    var DLDK = rowData[5]; //value DL/DLDK
    var IjinDT = rowData[6]; //value Ijin
    var DTPC = rowData[7]; //value DT/PC
    var CutiTahunan = rowData[8]; //value cuti tahunan
    var CutiLainnya = rowData[9]; //value cuti lainnya
    var phonenumber = rowData[10];
    var validPhoneNumber = String(phonenumber).replace(/[^0-9]/g, ''); 

    var APIKey = "API_KEY";
    var url = "URL_KEY";

     Logger.log("Phone number (to): " + validPhoneNumber);

     if (!validPhoneNumber) {
            Logger.log("Skipping row " + (i + 2) + " due to invalid phone number.");
            continue;
        }

    var pesan = `*Semangat Pagi ${Nickname}*
Menginformasikan rekap presensi ${Nickname} periode Juni 2024 (21 Mei s.d. 20 Juni), sbb:
Alpha : ${Alpa}
Ijin : ${Ijin}
Hadir : ${Hadir}
DL/DLDK : ${DLDK}
Ijin DT/PC : ${IjinDT}
DT / PC : ${DTPC}
Cuti Tahunan : ${CutiTahunan}
Cuti Lainnya : ${CutiLainnya}

Apabila terdapat informasi yang tidak sesuai, silahkan berkomunikasi dengan barista Warkop Kepegawaian a.n. Mia Admika

Terima kasih`;

        var payload = {
            "messageType": "text",
            "body": pesan,
            "to": String(phonenumber)
        };

        var response = UrlFetchApp.fetch(url, {
            "method": "post",
            "headers": {
                "Authorization": APIKey
            },
            "payload": JSON.stringify(payload)
        });
        
        Logger.log(response.getContentText());
    }
}
