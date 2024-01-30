        var energyInputFromSun = 100000000;  
        const trophicLevels = 4;  
        const energyEfficiency = 0.01; 
        const consumptionEfficiency = 0.1;  
        const plantsEnergyPerIndividual = 10;  

        var trophicLevelsData = [];
        var energyData = [];
        const populationData = [];

        let energyAvailable = energyInputFromSun * energyEfficiency;
        for (let level = 1; level <= trophicLevels; level++) {
            trophicLevelsData.push(level);
            if(level){
                console.log(`${level} - enAv ${energyAvailable}`)
                if(energyAvailable <= 1) {
                energyData.push(1);
                } else {
                    energyData.push(energyAvailable);
                }
            } else {
                energyData.push(energyAvailable);
            }

            var plantsEnergy = energyAvailable * consumptionEfficiency;
            if(plantsEnergy <= 1) {
                plantsEnergy = 1 }
            console.log(`${level} - plEn ${plantsEnergy}`)

            const plantsRequired = energyAvailable / (plantsEnergyPerIndividual * consumptionEfficiency);
            console.log(`${level} - plRq ${plantsRequired}`)
            populationData.push(plantsRequired);

            energyAvailable *= consumptionEfficiency;
            if(energyAvailable <= 1) {
                energyAvailable = 1
                }
            console.log(`${level} - newEnAv ${energyAvailable}`)
        }

        const ctx = document.getElementById('energy-chart').getContext('2d');
        var energyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: trophicLevelsData,
                datasets: [
                    {
                        label: 'Energy (Units)',
                        data: energyData,
                        backgroundColor: 'rgba(21, 5, 120, 0.8',
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Trophic Level',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Energy (Units)',
                        },
                        type: 'logarithmic', // Use a logarithmic scale for the y-axis
                        min: 1, // Set a minimum value for the y-axis
                    },
                },
                plugins: {
                    annotation: {
                        annotations: [], 
                    },
                },
            },
        });

        for (let level = 1; level < populationData.length; level++) {
            const plantsNeeded = populationData[level];
            const chartInstance = energyChart; 
            const dataset = chartInstance.data.datasets[0]; 

            const yScale = chartInstance.scales.y;

            const coordinates = [];

            dataset.data.forEach((value, index) => {
                const xCoordinate = chartInstance.scales.x.getPixelForValue(index); // X coordinate
                const yCoordinate = yScale.getPixelForValue(value); // Y coordinate
                coordinates.push({ x: xCoordinate, y: yCoordinate });
                console.log(index)
                console.log(coordinates[index])
                const annotation = {
                    type: 'label',
                    backgroundColor: 'rgba(255, 99, 132, 0.25)',
                    borderWidth: 3,
                    borderColor: 'red',
                    content: ['Previous level', 'Organisms Required', `${plantsNeeded}`],
                    callout: {
                      display: true,
                      borderColor: 'red',
                    },
                    xValue: coordinates[index].x,
                    yValue: coordinates[index].y
                  };
                  
                  //</script>energyChart.options.plugins.annotation.annotations[level] = annotationo;
                  
            });
            
            
            

            
            /*const annotationn = {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y',
                value: plantsNeeded + 100,
                borderColor: 'red',
                borderWidth: 1,
                label: {
                    content: `Previous Lvl. Org. Needed: ${Math.round(plantsNeeded)}`,
                    enabled: true,
                },
            };

            energyChart.options.plugins.annotation.annotations[level] = annotation;
            */
        }
        function updateGraph() {
            const newValue = parseFloat(document.getElementById('inputValue').value);
            energyInputFromSun = newValue;
            let energyAvailable = energyInputFromSun * energyEfficiency;
            energyData = [];
            energyChart.update()
            trophicLevelsData = [];
    for (let level = 1; level <= trophicLevels; level++) {
        trophicLevelsData.push(level);
        if(level){
            console.log(`${level} - enAv ${energyAvailable}`)
            if(energyAvailable <= 1) {
            energyData.push(1);
            } else {
                energyData.push(energyAvailable);
            }
        } else {
            energyData.push(energyAvailable);
        }

        var plantsEnergy = energyAvailable * consumptionEfficiency;
        if(plantsEnergy <= 1) {
            plantsEnergy = 1 }
        console.log(`${level} - plEn ${plantsEnergy}`)

        const plantsRequired = energyAvailable / (plantsEnergyPerIndividual * consumptionEfficiency);
        console.log(`${level} - plRq ${plantsRequired}`)
        populationData.push(plantsRequired);

        energyAvailable *= consumptionEfficiency;
        if(energyAvailable <= 1) {
            energyAvailable = 1
            }
        console.log(`${level} - newEnAv ${energyAvailable}`)
    }       
            energyChart.data.datasets[0].data = energyData;
            energyChart.update();
        }

        energyChart.update();