# Application model

Sammary
=======
to be...


Format
=======

```json
{
  "name": "<application name>",
  "type": "<application type>",
  "args": {
    "<name>": "<default value>",
    "...": "..."
  }
}
```

`name` will be the name as shown application list in toolbox of GUI.
`type` is the name of function to install application
`args` is its arguments


Example
=======

This filename is `ping.json`

```json
{
  "type": "myPing",
  "args": {
    "shost": "", 
    "sport": 60000,
    "dhost": "",
    "dport": 8080,
    "start": 1,
    "stop": 10,
    "rate": "1Mbps"
  }
}
```
