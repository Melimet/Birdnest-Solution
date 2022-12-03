export const validDroneXml = `<report>
<script/>
<deviceInformation deviceId="GUARDB1RD">
<listenRange>500000</listenRange>
<deviceStarted>2022-12-03T12:03:30.900Z</deviceStarted>
<uptimeSeconds>20662</uptimeSeconds>
<updateIntervalMs>2000</updateIntervalMs>
</deviceInformation>
<capture snapshotTimestamp="2022-12-03T17:47:53.337Z">
<drone>
<serialNumber>SN-IuvKRfoMZG</serialNumber>
<model>HRP-DRP 1 S</model>
<manufacturer>ProDröne Ltd</manufacturer>
<mac>c6:0b:43:ca:01:46</mac>
<ipv4>76.71.82.153</ipv4>
<ipv6>b90a:4600:c323:a11a:f431:fb45:4aea:9e02</ipv6>
<firmware>5.1.1</firmware>
<positionY>161438.6485809734</positionY>
<positionX>248970.73496574067</positionX>
<altitude>4668.644074402538</altitude>
</drone>
<drone>
<serialNumber>SN-MWS_f87vLJ</serialNumber>
<model>Eagle</model>
<manufacturer>MegaBuzzer Corp</manufacturer>
<mac>98:04:7c:05:99:b2</mac>
<ipv4>175.9.78.156</ipv4>
<ipv6>d195:d770:2a20:50bb:4902:3409:bb87:2ad8</ipv6>
<firmware>2.6.4</firmware>
<positionY>171826.60599272174</positionY>
<positionX>377374.26768386713</positionX>
<altitude>4602.326771321588</altitude>
</drone>
<drone>
<serialNumber>SN-BiaStV1AF0</serialNumber>
<model>Eagle</model>
<manufacturer>MegaBuzzer Corp</manufacturer>
<mac>70:fc:bd:ea:1e:ff</mac>
<ipv4>203.59.248.250</ipv4>
<ipv6>5fb2:8230:36a4:dd40:1fee:4e28:219e:1ce6</ipv6>
<firmware>8.7.8</firmware>
<positionY>305787.4839306696</positionY>
<positionX>45918.87233451607</positionX>
<altitude>4145.40613636037</altitude>
</drone>
</capture>
</report>
`
//invalid is missing serial number and positionX
export const invalidDroneXml = `<report>
<script/>
<deviceInformation deviceId="GUARDB1RD">
<listenRange>500000</listenRange>
<deviceStarted>2022-12-03T12:03:30.900Z</deviceStarted>
<uptimeSeconds>21811</uptimeSeconds>
<updateIntervalMs>2000</updateIntervalMs>
</deviceInformation>
<capture snapshotTimestamp="2022-12-03T18:07:02.223Z">
<drone>
<model>Falcon</model>
<manufacturer>MegaBuzzer Corp</manufacturer>
<mac>07:33:45:8a:c9:95</mac>
<ipv4>252.18.150.254</ipv4>
<ipv6>dab9:011a:34d6:5bb3:941c:184b:6fee:f3a0</ipv6>
<firmware>7.7.3</firmware>
<positionY>298401.4763583601</positionY>
<altitude>4053.853535557905</altitude>
</drone>
</capture>
</report>`