class AthleteFormatter {
  constructor(data) {
    this.name = data.Name,
    this.sex = data.Sex === 'NA'
      ? undefined
      : data.Sex,
    this.age = data.Age === 'NA'
      ? undefined
      : data.Age
    this.height = data.Height === 'NA'
      ? undefined
      : data.Height
    this.weight = data.Weight === 'NA'
      ? undefined
      : data.Weight
    this.team = data.Team === 'NA'
      ? undefined
      : data.Team
  }
}

module.exports = AthleteFormatter;