import tgimbox
import re
import json

#[
#  {"name": "Box",         "type": "BasicBox",         "ports":[]},
#  {"name": "RouteSwitch", "type": "BasicRouteSwitch", "ports":["gw", "port0", "port1"]},
#  {"name": "Router",      "type": "BasicRouter",      "ports":["gw", "lan0", "lan1", "lan2", "lan3"]},
#  {"name": "Switch",      "type": "BasicSwitch",      "ports":["port0", "port1", "port2", "port3"]},
#  {"name": "Terminal",    "type": "BasicTerminal",    "ports":["port"]}
#]

all_boxkey_ports = [
  {'name': name, 'type':key,'ports':tgimbox.__dict__[key].GetPorts()}
  for key in dir(tgimbox) if re.match("^Basic", key)
  for name in [re.match("^Basic(.*)", key).group(1)]
  ]

print(json.dumps(all_boxkey_ports))
