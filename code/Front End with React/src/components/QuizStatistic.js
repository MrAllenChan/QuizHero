import React from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'



class QuizStatistic extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quizData : []
        }
    }

    componentDidMount(){
        const BASE_URL = document.location.origin;
        let params = {
            fileId : 1,
            questionId: 1,
        }
        axios
        .get(BASE_URL + "/quizstat", {params})
        .then((res) => {
            if(res.status === 200){
                this.setState({quizData : res.data});
                console.log("res",res);
            }
            // console.log(res.data);
        })
        .catch((error) => {
            console.log("error")
        });
    }

    render() {
        // const {chartData} = this.props;
        // const charData = [];
        // const myChartData = chartData.details?chartData.details.dtl:[];
        // const categories = [], roArray = [], shfArray = [], avgArray = [];

        // myChartData.map((item)=>{
        //     const roNum = parseFloat(item.RO_COUNT);
        //     const shfNum = parseFloat(item.SHF_COUNT);
        //     const avgNum = parseFloat(item.AVG_VAL);

        //     categories.push(item.MECHANIC_NAME);
        //     roArray.push(roNum);
        //     shfArray.push(shfNum);
        //     avgArray.push(avgNum);
        // });

        // console.log("quiz data",typeof(this.state.quizData))
        var jsonArray = this.state.quizData;
        // for(let i=0;i<jsonArray.length;i++){
        //     jsonArray[i].answer = 'B';
        // }

        // var jsonArray = [
        //     {
        //         "id": 1,
        //         "fileId": 1,
        //         "questionId": 1,
        //         "answer": 'B',
        //         "countA": 13,
        //         "countB": 14,
        //         "countC": 8,
        //         "countD": 9
        //     },
        //     {
        //         "id": 2,
        //         "fileId": 1,
        //         "questionId": 2,
        //         "answer": 'C',
        //         "countA": 8,
        //         "countB": 6,
        //         "countC": 25,
        //         "countD": 11
        //     }
        // ];
     
        var quizNum = 0;
        var xAxisData = [];
        var countA = [];
        var countB = [];
        var countC = [];
        var countD = [];
        var answers = [];
        var correntPercent = [];
        var color = ['#FE8463', '#C6E579', '#32D3EB'];

        for (var index in jsonArray) {
            quizNum = quizNum + 1;
            xAxisData.push("Q" + quizNum);
            countA.push(jsonArray[index].countA);
            countB.push(jsonArray[index].countB);
            countC.push(jsonArray[index].countC);
            countD.push(jsonArray[index].countD);
            answers.push(jsonArray[index].answer);
            var total = jsonArray[index].countA + jsonArray[index].countB + jsonArray[index].countC + jsonArray[index].countD;
            var num = 0;
            if (jsonArray[index].answer === "A") {
                num = jsonArray[index].countA;
            }
            else if (jsonArray[index].answer === "B") {
                num = jsonArray[index].countB;
            }
            else if (jsonArray[index].answer === "C") {
                num = jsonArray[index].countC;
            }
            else if (jsonArray[index].answer === "D") {
                num = jsonArray[index].countD;
            }
            var percent = num / total * 100;
            correntPercent.push(percent.toFixed(1));
        }

       
        const echartOption = {
            title: { text: 'Quiz Statistic',
                    x:'center'},
    
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
            },
            // legend: {
            //     // x:'left',
            //     // data:["A","B","C","D"]
            //     orient: 'horizontal',
            //     x:'center',
            //     y: 'top',
            //     data: [
            //         {
            //             name: 'Correct Answer',
            //             textStyle:{fontWeight:'bold', color:'green'}
            //         },
            //         {
            //             name: 'Wrong Answer',
            //             textStyle:{fontWeight:'bold', color:'blue'}
            //         },
                
            //     ],  
            // },
            
            xAxis: {
                // name:"Quiz Number",
                // data: ["Q1", "Q2", "Q3", "Q4"],
                data: xAxisData,
            },
            yAxis: [
                {
                    type: 'value',
                    name:"Amount of Choices",
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: 'black'
                        }
                    },
                },
                {
                    type: 'value',
                    name: 'Correct Percentage',
                    position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: 'black'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            
            series: [
                {
                    name: 'A',
                    type: 'bar',
                    barGap: 0.1,
                    barWidth : 30,
                    data: countA,
                    itemStyle: {
                        normal: {
                            color: function(params) {                        
                                return answers[params.dataIndex] === 'A' ? color[0] : color[1];
                            }
                        }
                    }
                },
                {
                    name: 'B',
                    type: 'bar',
                    barWidth : 30,
                    data: countB,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return answers[params.dataIndex] === 'B' ? color[0] : color[1];
                            }
                        }
                    }
                },
                {
                    name:'C',
                    type:'bar',
                    barWidth: 30,
                    data: countC,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return answers[params.dataIndex] === 'C' ? color[0] : color[1];
                            }
                        }
                    }
                },
                {
                    name:'D',
                    type:'bar',
                    barWidth: 30,
                    data: countD,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return answers[params.dataIndex] === 'D' ? color[0] : color[1];
                            }
                        }
                    }
                },
                {
                    name: 'Corrent Percentage',
                    type: 'line',
                    data: correntPercent,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {color: color[2]}
                    }
                }
            ]
            // series: [
            //     {
            //         name: '台次',
            //         type: 'bar',
            //         barGap: 0,
            //         barWidth : 30,
            //         data:roArray.length!==0?roArray:[5, 20, 36, 10, 10, 20],
            //         //data: [5, 20, 36, 10, 10, 20],
            //         itemStyle:{
            //             normal:{color:'#4cabce'}
            //         }
            //     },
        
            //     {
            //         name:'平均(面/天)',
            //         type:'line',
            //         data:avgArray.length!==0?avgArray:[5.5, 10.2, 22, 15, 6.3, 10.2],
            //         //data:[5.5, 10.2, 22, 15, 6.3, 10.2],
            //         itemStyle:{
            //             normal:{color:'#e5d930'}
            //         }
            //     }
            // ]
        };

        const firstButtonStyle = {
            backgroundColor:"#FE8463",
            width:"30px",
            height:"15px",
            margin:"0px 10px",
            borderRadius: "3px"
          };

          const secondButtonStyle = {
            backgroundColor:"#C6E579",
            width:"30px",
            height:"15px",
            margin:"0px 10px",
            borderRadius: "3px"
          };

        return (
            <div>
                <div className="legend" style={{float:"left"}}>
            <span style={{marginLeft:"10px"}}>Correct Answer</span><button style={firstButtonStyle}></button>
            <span style={{marginLeft:"10px"}}>Wrong Answer</span><button style={secondButtonStyle}></button>
            </div>
            <ReactEcharts
                ref={(e) => {this.echartsElement = e }}
                option={echartOption}
                theme="clear"
            />
            </div>
        )
    }
}

export default QuizStatistic