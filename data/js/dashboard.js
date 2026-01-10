function fetchStatus() {
    fetch('/status')
        .then(res => res.json())
        .then(data => {
            document.getElementById('batteryVoltage').textContent = data.batteryVoltage.toFixed(3) + ' V';
            document.getElementById('systemVoltage').textContent = data.systemVoltage.toFixed(3) + ' V';
            document.getElementById('vbusVoltage').textContent = data.vbusVoltage.toFixed(3) + ' V';
            document.getElementById('chargeCurrent').textContent = data.chargeCurrent + ' mA';
            document.getElementById('temperature').textContent = data.temperature.toFixed(1) + ' °C';
            document.getElementById('charging').textContent = data.chargerEnabled ? 'Yes' : 'No';
            document.getElementById('statusText').textContent = data.chargingStatusText;
        });
}

function applySettings() {
    const payload = {
        chargeVoltage: parseInt(document.getElementById('chargeVoltage').value),
        chargeCurrent: parseInt(document.getElementById('chargeCurrentSet').value),
        inputVoltageLimit: parseInt(document.getElementById('inputVoltageLimit').value),
        inputCurrentLimit: parseInt(document.getElementById('inputCurrentLimit').value)
    };
    fetch('/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(res => {
        if (res.ok) alert("Settings applied");
    });
}

function toggleCharging() {
    fetch('/toggle_charging').then(() => fetchStatus());
}

setInterval(fetchStatus, 3000);
fetchStatus();
function applySettings() {
  const voltage = document.getElementById("chargeVoltage").value;
  const current = document.getElementById("chargeCurrentSet").value;
  const vin = document.getElementById("inputVoltLimit").value;
  const iin = document.getElementById("inputCurrLimit").value;

  alert(`Settings applied:\nVoltage: ${voltage}mV\nCurrent: ${current}mA\nInput V: ${vin}mV\nInput I: ${iin}mA`);
  // Replace with actual POST request to ESP32
}

function toggleCharging() {
  alert("Charging toggled!");
  // Replace with actual request to toggle charger state
}
