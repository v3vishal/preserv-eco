var trophicLvls = 4;
        var data = [
            { type: 'Tigers', value: 150 },
        ];
        var lastTLval = data[0].value
        var lastmin1Val = lastTLval/0.1
        var lastmin2Val = lastmin1Val/0.1
        var lastmin3Val = lastmin2Val/0.1
        lastmin3Val *= 5
        data.push(
            {type: 'Carnivores', value: Math.round(lastmin1Val/1.25)},
            {type: 'Herbivores', value: Math.round(lastmin2Val/1.2)},
            {type: 'Trees/Plants', value: Math.round(lastmin3Val)},);
        var amount = 150;
        var chart;
        initializeChart()

        function initializeChart() {
            var color = '#999900';
            chart = JSC.chart('chartDiv', {
                debug: true,
                type: 'horizontal marker',
                title_label: {
                    text: 'Prediction for certain amount of tree/tiger existence based on current tiger/tree survival amount (<icon name=material/image/nature size=20 color=' + color + '> - ' + amount + ' Organisms)',
                    style_fontSize: 16
                },
                palette: [color],
                defaultSeries: {
                    legendEntry_visible: false,
                    mouseTracking_enabled: false,
                    lastPoint_label: {
                        text: '<b>%val</b>',
                        align: 'right',
                        style_fontSize: 14
                    }
                },
                xAxis_defaultTick: {
                    gridLine_visible: false,
                    line_visible: false
                },
                yAxis_visible: false,
                defaultPoint: {
                    marker: {
                        type: 'material/image/nature',
                        size: 24,
                        outline_width: 0
                    },
                    focusGlow: false
                },
                series: makeSeriesu(data)
            });
        }

        function makeSeriesu(data) {
            return data.map(function (item) {
                var points = [],
                    maxImages = Math.round(item.value / amount);
                for (var i = 0; i < maxImages; i++) {
                    points.push({
                        x: item.type,
                        y: i + 1,
                        attributes_val: item.value
                    });
                }
                return { name: item.name, points: points };
            });
        }


        function updateTigerValue() {
            var newTigerValue = parseFloat(document.getElementById('newTigerValue').value);
            newTigerValue = Math.round(newTigerValue);
            if (!isNaN(newTigerValue) && newTigerValue > 0) {
                data = [ 
                {type: "Tigers", value: newTigerValue}
                ];
                amount = newTigerValue;
                var lastTLval = data[0].value
                var lastmin1Val = Math.round(lastTLval/0.1)
                var lastmin2Val = Math.round(lastmin1Val/0.1)
                var lastmin3Val = Math.round(lastmin2Val/0.1)
                lastmin3Val *= 5
                Math.round(lastmin3Val);
                data.push(
                    {type: 'Carnivores', value: Math.round(lastmin1Val/1.25)},
                    {type: 'Herbivores', value: Math.round(lastmin2Val/1.2)},
                    {type: 'Trees/Plants', value: Math.round(lastmin3Val)},);
                chart.destroy();
                initializeChart();
            } else {
                alert('Please enter a valid numeric value for Tigers.');
            }
        }
        function updateTreeValue() {
            var newTreeValue = parseFloat(document.getElementById('newTreeValue').value);
            newTreeValue = Math.round(newTreeValue);
            if (!isNaN(newTreeValue) && newTreeValue > 0) {
                data = [ 
                {type: "Trees/Plants", value: newTreeValue}
                ];
                
                var firstTLval = data[0].value
                var firstpl1Val = Math.round(firstTLval*0.1)
                var firstpl2Val = Math.round(firstpl1Val*0.1)
                var firstpl3Val = Math.round(firstpl2Val*0.1)
                firstpl3Val = Math.round(firstpl3Val/5)
                if(firstpl3Val > 0) {
                amount = firstpl3Val;
                data.push(
                    {type: 'Herbivores', value: Math.round(firstpl1Val/1.2)},
                    {type: 'Carnivores', value: Math.round(firstpl2Val/1.25)},
                    {type: 'Tigers', value: Math.round(firstpl3Val)},);
                chart.destroy();
                initializeChart();
                } else {
                    alert("These many trees won't suffice for one tiger. Food chain will end before reaching tiger. Error code: CHART_SCALE_0x0")
                }
            } else {
                alert('Please enter a valid numeric value for Trees.');
            }
        }
        function resetToCrntTgr() {
            data = [ 
                {type: "Tigers", value: 150}
                ];
                amount = 150;
                var lastTLval = data[0].value
                var lastmin1Val = lastTLval/0.1
                var lastmin2Val = lastmin1Val/0.1
                var lastmin3Val = lastmin2Val/0.1
                lastmin3Val *= 5
                data.push(
                    {type: 'Carnivores', value: Math.round(lastmin1Val/1.25)},
            {type: 'Herbivores', value: Math.round(lastmin2Val/1.2)},
            {type: 'Trees/Plants', value: Math.round(lastmin3Val)},);
                chart.destroy();
                initializeChart();
        }
        function resetToCrntTree() {
            data = [ 
                {type: "Trees/Plants", value: 1350000}
                ];
                
                var firstTLval = data[0].value
                var firstpl1Val = firstTLval*0.1
                var firstpl2Val = firstpl1Val*0.1
                var firstpl3Val = firstpl2Val*0.1
                firstpl3Val = firstpl3Val/5
                amount = firstpl3Val;
                data.push(
                    {type: 'Herbivores', value: Math.round(firstpl1Val/1.2)},
                    {type: 'Carnivores', value: Math.round(firstpl2Val/1.25)},
                    {type: 'Tigers', value: Math.round(firstpl3Val)},);
                chart.destroy();
                initializeChart();
        }
        function updateHerbivoresValue() {
            var newHerbivoresValue = parseFloat(document.getElementById('newHerbivoresValue').value);
            newHerbivoresValue = Math.round(newHerbivoresValue);
            if (!isNaN(newHerbivoresValue) && newHerbivoresValue > 0) {
                    data = [ 
                        {type: "Trees/Plants", value: 0},
                        {type: "Herbivores", value: newHerbivoresValue}
                    ];
                    
                    treeval = Math.round(newHerbivoresValue/0.1);
                    herbval = Math.round(newHerbivoresValue);
                    carnval = Math.round(newHerbivoresValue*0.1);
                    tigrval = Math.round(carnval*0.1);
                    tigrval = Math.round(tigrval/5);
                    if(tigrval > 0){
                    amount = tigrval;
                    data = [];
                    data.push(
                        {type: "Trees/Plants", value: treeval*1.2},
                        {type: "Herbivores", value: Math.round(herbval)},
                        {type: "Carnivores", value: Math.round(carnval/1.25)},
                        {type: "Tigers", value: Math.round(tigrval)}
                    );
                    chart.destroy();
                    initializeChart();
                    } else {
                        alert("These many herbivores won't suffice for one tiger. Food chain will end before reaching tiger. Error code: CHART_SCALE_0x0");
                    }
            } else {
                alert('Please enter a valid numeric value for Herbivores.');
            }
        }

        function updateCarnivoresValue() {
            var newCarnivoresValue = parseFloat(document.getElementById('newCarnivoresValue').value);
            newCarnivoresValue = Math.round(newCarnivoresValue);
            if (!isNaN(newCarnivoresValue) && newCarnivoresValue > 0) {
                data = [ 
                    {type: "Trees/Plants", value: 0},
                    {type: "Herbivores", value: 0},
                    {type: "Carnivores", value: newCarnivoresValue}
                ];
                
                treeval = Math.round(herbval/0.1);
                herbval = Math.round(newCarnivoresValue/0.1);
                carnval = Math.round(newCarnivoresValue);
                tigrval = Math.round(carnval*0.1);
                tigrval = Math.round(tigrval/5);
                if(tigrval > 0) {
                amount = tigrval;
                data = [];
                data.push(
                    {type: "Trees/Plants", value: treeval},
                    {type: "Herbivores", value: Math.round(herbval/1.2)},
                    {type: "Carnivores", value: Math.round(carnval/1.25)},
                    {type: "Tigers", value: Math.round(tigrval)}
                );
                chart.destroy();
                initializeChart();
                } else {
                    alert("These many carnivores won't suffice for one tiger. Food chain will end before reaching tiger. Error code: CHART_SCALE_0x0");
                }
            } else {
                alert('Please enter a valid numeric value for Carnivores.');
            }
        }

        initializeChart();
