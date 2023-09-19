const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const dataPromise = d3.json(url);
dataPromise.then(function(data) {
    console.log(data);

    let names = Object.values(data.names);
    let samples = Object.values(data.samples);
    let metadata = Object.values(data.metadata);
    console.log(metadata)

    let ids = samples[0].otu_ids;
    let values = samples[0].sample_values;
    let labels = samples[0].otu_labels


let panelContent = document.getElementById('sample-metadata');
let panelId = document.createElement('p');
let panelEthnicity = document.createElement('p');
let panelGender = document.createElement('p');
let panelAge = document.createElement('p');
let panelLocation = document.createElement('p');
let panelbbtype = document.createElement('p');
let panelWfreq = document.createElement('p');

    console.log(samples[0].otu_ids.slice(0,10))


//set up original bar chart
    function init() {

        let data =[{
            x: values.slice(0,10),
            y: ids.slice(0,10).map(id => `OTU ${id}`),
            text: labels,
            type:'bar',
            orientation: 'h',
            
            
        }];
        let layout = {
            yaxis: {
                categoryorder: 'total ascending',
            }
        };
    
        Plotly.newPlot('bar', data, layout);


//set up original bubble chart
let bubbleData = {
    x: ids,
    y: values,
    text: labels,
    type: 'bubble',
    mode: 'markers',
    marker: {
      size: values,
      color: ids,
      colorscale: "Earth"
    }
  };
  let bubbleLayout = {
    xaxis: {
        title: 'OTU ID'
    }};
  
  Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
        

// set up original demographic info


panelId.textContent = `id: ${metadata[0].id}`;
panelEthnicity.textContent = `ethnicity: ${metadata[0].ethnicity}`;
panelGender.textContent = `gender: ${metadata[0].gender}`;
panelAge.textContent = `age: ${metadata[0].age}`;
panelLocation.textContent = `location: ${metadata[0].location}`;
panelbbtype.textContent = `bbtype: ${metadata[0].bbtype}`;
panelWfreq.textContent = `wfreq: ${metadata[0].wfreq}`;

panelContent.appendChild(panelId);
panelContent.appendChild(panelEthnicity);
panelContent.appendChild(panelGender);
panelContent.appendChild(panelAge);
panelContent.appendChild(panelLocation);
panelContent.appendChild(panelbbtype);
panelContent.appendChild(panelWfreq);

    }

const dropdown = d3.selectAll("#selDataset");

names.forEach(name => {
  dropdown.append("option")
    .attr("value", name)
    .text(name);
});

dropdown.on("change", function(){
    const selectedValue= this.value;
     optionChanged(selectedValue);
})

function optionChanged(name) {
    const selectedSample = data.samples.find(sample => sample.id === name);
    const selectedDemo = data.metadata.find(meta => meta.id == name);
    console.log(selectedDemo)

    if (selectedSample) {
        updateBarChart(selectedSample)
        updatedBubbleChart(selectedSample)
    } else {
      return "Sample not found";
    }
    if (selectedDemo){
        updatedDemoInfo(selectedDemo)
    }else{
        return "Sample not found";
    }
    }


// updates the horizontal bar chart
  function updateBarChart(selectedSample){
    let updatedIds = selectedSample.otu_ids.slice(0,10);
    let updatedValues = selectedSample.sample_values.slice(0,10);

    let updatedData =[{
        x: updatedValues,
        y: updatedIds.map(id => `OTU ${id}`),
        type:'bar',
        orientation: 'h'
    }];
    let layout = {
        yaxis: {
            categoryorder: 'total ascending',
        }
    };

    Plotly.newPlot('bar', updatedData, layout);
  }

  //updates bubble chart
  function updatedBubbleChart(selectedSample){
    let updatedBubIds = selectedSample.otu_ids;
    let updatedBubValues = selectedSample.sample_values;
    let updatedBubLabels = selectedSample.otu_labels;

    let updatedBubData = [{
        x: updatedBubIds,
        y: updatedBubValues,
        text: updatedBubLabels,
        type: 'bubble',
        mode: 'markers',
        marker: {
          size: updatedBubValues,
          color: updatedBubIds,
          colorscale: "Earth"
        }
      }];
      let bubbleLayout = {
        xaxis: {
            title: 'OTU ID'
        }};

        Plotly.newPlot('bubble', updatedBubData, bubbleLayout);
    
    }

// update the demographic info
    function updatedDemoInfo(selectedDemo){
        panelId.textContent = `id: ${selectedDemo.id}`;
        panelEthnicity.textContent = `ethnicity: ${selectedDemo.ethnicity}`;
        panelGender.textContent = `gender: ${selectedDemo.gender}`;
        panelAge.textContent = `age: ${selectedDemo.age}`;
        panelLocation.textContent = `location: ${selectedDemo.location}`;
        panelbbtype.textContent = `bbtype: ${selectedDemo.bbtype}`;
        panelWfreq.textContent = `wfreq: ${selectedDemo.wfreq}`;

    }
  
  init();

  });
