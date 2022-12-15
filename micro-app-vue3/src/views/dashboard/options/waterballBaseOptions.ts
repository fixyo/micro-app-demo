export const getWaterBallBaseOptions = (name: string, shadowColor: string, data: any) => {
  const waterBallBaseOption = {
    tooltip: {
      show: true,
      position: [70, 25],
      formatter(params: any) {
        const num = `${params.seriesName}<br/>${params.data.value * 100}% `
        return num
      }
    },
    series: [
      {
        name: '',
        type: 'liquidFill',
        data,
        radius: '80%',
        itemStyle: {
          shadowBlur: 0
        },
        outline: {
          show: true,
          borderDistance: 0,
          itemStyle: {
            borderWidth: 5,
            borderColor: 'rgba(70,79,104,0.8)',
            shadowBlur: 7,
            shadowColor
          }
        },
        label: {
          show: false
        }
      }
    ]
  }

  return waterBallBaseOption
}
