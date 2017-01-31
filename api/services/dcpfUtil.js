/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const XmlStream = require('xml-stream');

module.exports.update = function () {

  return new Promise(function (resolve, reject) {
    sails.log.info('[CRON] - Destroying DCPF Collection.');
    Dcpf.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying DCPF.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating DCPF.');
        var stream = fs.createReadStream('data/DICCIONARIO_DCPF.xml');
        var xml = new XmlStream(stream);
        xml.collect('dcpf');
        xml.on('endElement: dcpf', function (item) {
          xml.pause();
          Dcpf.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating DCPF.");
          resolve();
        });





        // fs.readFile('data/DICCIONARIO_DCPF.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_dcpf.dcpf;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigodcpf = index[item].codigodcpf.toString();
        //         var nombredcpf = index[item].nombredcpf.toString();
        //         var nombrecortodcpf = index[item].nombrecortodcpf.toString();
        //         var codigodcp = index[item].codigodcp.toString();
        //         Dcpf.create({
        //           codigodcpf: codigodcpf,
        //           nombredcpf: nombredcpf,
        //           nombrecortodcpf: nombrecortodcpf,
        //           codigodcp: codigodcp
        //         }).exec(function (err, data) {
        //           if (err) reject(err);
        //           else {
        //             count++;
        //             if (count == index.length) resolve();
        //           }
        //         })
        //       }
        //     }
        //   })
        // })

      }
    })
  });
};
