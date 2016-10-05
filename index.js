/**
 * @description
 * Training with BOX API and stuff.
 *
 * Feel free to copy and paste stuff.
 *
 * Remeber to add an environment file.
 */

'use strict';

const BoxSDK = require('box-node-sdk');
const env = require('./env.json');
const token = require('./token.js');

let createFolder = () => {

    let sdk = new BoxSDK({
        clientID: env.BOX_CLIENT_ID,
        clientSecret: env.BOX_CLIENT_SECRET
    });

    token.getToken().then(
        (tkn) => {

            let box = sdk.getBasicClient(tkn);

            /*
             * Displays current logged user
             */

            box.users.get(box.CURRENT_USER_ID, null, (err, currentUser) => {
                if (err) throw err;
                console.log('Hello, ' + currentUser.name + '!');
            });

            /*
             * Create folder
             */

            let folder = {};

            box.folders.create('11569709477', 'New Folder 10', callback);

            function callback(err, data) {
                if (err) return console.error('ERROR CREATING FOLDER', err);
                folder.id = data.id;
                folder.name = data.name;
            }

            /*
             * Delete folder
             */

            setTimeout(()=> {
                console.log('Now let`s delete the folder ' + folder.name)

                box.folders.delete(folder.id, {recursive: true}, callbackDelete);

                function callbackDelete(err) {
                    if (err) {
                        return console.error('ERROR REMOVING FOLDER', err);
                    } else {
                        console.log('Folder removed successfully');
                    }
                }

            }, 10000);

        }
    );
};

createFolder();