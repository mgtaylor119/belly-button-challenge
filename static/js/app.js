const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const dataPromise = d3.json(url);
dataPromise.then(function(data) {
    console.log(data);

    let names = Object.values(data.names);
    let samples = Object.values(data.samples);

    let ids = samples[0].otu_ids;
    let values = samples[0].sample_values;
    let labels = samples[0].otu_labels

    const customColorScale = [
        [0, 'rgb(66, 135, 245)'],  
        [0.5, 'rgb(0, 255, 0)'],   
        [1, 'rgb(139, 69, 19)']    
    ];

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
      colorscale: customColorScale
    }
  };
  let bubbleLayout = {
    xaxis: {
        title: 'OTU ID'
    }};
  
  Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
        
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
    if (selectedSample) {
        updateBarChart(selectedSample)
        updatedBubbleChart(selectedSample)
    } else {
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
          colorscale: customColorScale
        }
      }];
      let bubbleLayout = {
        xaxis: {
            title: 'OTU ID'
        }};

        Plotly.newPlot('bubble', updatedBubData, bubbleLayout);
    
    }
  
  init();




  });
