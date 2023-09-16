const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const dataPromise = d3.json(url);
dataPromise.then(function(data) {
    console.log(data);

    let names = Object.values(data.names);
    let samples = Object.values(data.samples);
    console.log(samples[0].otu_ids.slice(0,10));
    let ids = samples[0].otu_ids.slice(0,10);
    let values = samples[0].sample_values.slice(0,10);

    function init() {

        let data =[{
            y: ids.map(id => `OTU ${id}`),
            x: values,
            type:'bar',
            orientation: 'h',
            
            
        }];
        let layout = {
            yaxis: {
                categoryorder: 'total ascending',
            }
        };
    
        Plotly.newPlot('bar', data, layout);
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
    } else {
      return "Sample not found";
    }
  }

  
// updates the horizontal bar chart
  function updateBarChart(selectedSample){
    let updatedIds = selectedSample.otu_ids.slice(0,10);
    let updatedValues = selectedSample.sample_values.slice(0,10);

    let updatedData =[{
        y: updatedIds.map(id => `OTU ${id}`),
        x: updatedValues,
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
  
  init();

  });
