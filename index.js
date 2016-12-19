const { exec } = require('child_process');
const got = require('got');
const haversine = require('haversine');
const fs = require('fs');
const path = require('path');

const { venue, access_token } = require('./config.json');

console.log('💨  ' + (new Date().toDateString()) + ': Let\'s run!');

const lastRunFile = path.join(__dirname, '.lastrun');
const lastRun = fs.existsSync(lastRunFile) && fs.readFileSync(lastRunFile, { encoding: 'utf-8' });

if ((lastRun || '').trim() == new Date().toDateString()){
  console.log('📆  Looks like you are already checked in for today. Try again tomorrow!');
  return;
}

exec(path.join(__dirname, './whereami'), (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stdout);

  const [lat, lng, accuracy] = stdout.split('\n').filter((line) => /(lat|long|accuracy)/i.test(line)).map((line) => line.match(/[\d\.]+/)[0]);
  const distance = haversine({
    latitude: lat,
    longitude: lng,
  }, {
    latitude: venue.lat,
    longitude: venue.lng,
  }, { unit: 'meter' });

  if (distance >= 5){ // too far
    console.log('🤔  Look like you are not in the zone... ' + parseInt(distance, 10) + 'm away?');
    return;
  }

  got.post('https://api.foursquare.com/v2/checkins/add', {
    query: {
      oauth_token: access_token,
      venueId: venue.id,
      ll: lat + ',' + lng,
      llAcc: parseInt(accuracy, 10),
      v: '20161111',
      m: 'swarm',
    }
  }).then((response) => {
    console.log('✅  Checked in for today!');
    fs.writeFileSync(lastRunFile, new Date().toDateString());
  }).catch((err) => {
    console.error(err);
  });
});
