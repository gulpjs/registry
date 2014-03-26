## Information

<table>
<tr> 
<td>Package</td><td>registry</td>
</tr>
<tr>
<td>Description</td>
<td>elasticsearch API wrapper</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
</table>


## Usage

```
node bin/proxy.js --port 80 --es http://localhost:9200/npm
```

This will simply proxy all GET request to the specified ElasticSearch URL

### Putting npm into elasticsearch

see [solids/npm2es](https://github.com/solids/npm2es)
