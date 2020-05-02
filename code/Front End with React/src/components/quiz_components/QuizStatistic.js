/**
 * The QuizStatistic component is to render quiz result statistic data as chart at ResultPresenter page.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'
import {Button} from 'antd'
import {BASE_URL} from "../../config/config"

/**
 * The class QuizStatistic is to get quiz statistic data and render the data as chart.
 */
class QuizStatistic extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quizData : [],
            fileId : props.fileId
        }
        console.log(this.state.fileId)
    }
    
    componentDidMount(){
        this.getStatistic();
    }

    /**
     * get statistic data again
     */
    refreshStatistic = () =>{
        console.log("Push");
        this.getStatistic();
    }

    /**
     * get statistic data from backend according to fileId and questionId.
     */
    getStatistic = ()=>{
        let params = {
            fileId : this.state.fileId,
            questionId: 1,
        }
        console.log(params)
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

    /**
     * Render chart of quiz Statistic data for each question
     * @returns {*}
     */
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
        var color = ['#C6E579', '#FE8463', '#32D3EB'];

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
        };

        const firstButtonStyle = {
            backgroundColor:'#C6E579',
            width:"30px",
            height:"15px",
            margin:"0px 10px",
            borderRadius: "3px"
          };

          const secondButtonStyle = {
            backgroundColor:'#FE8463',
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
                <Button onClick={this.refreshStatistic}>Refresh</Button>
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