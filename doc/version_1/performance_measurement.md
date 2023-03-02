# Performance Measurement
This is a very small and simple class used to measure the time passed
```javascript
const performance = new Ardime.Performance(); // note: automatically starts the clock

// run some code

performance.stop();
console.log(performance.getElapsedTime(Ardime.Const.Time.Millisec));
console.log(performance.getElapsedTime(Ardime.Const.Time.Seconds));
console.log(performance.getElapsedTime(Ardime.Const.Time.Minutes));
console.log(performance.getElapsedTime(Ardime.Const.Time.Hours));

performance.start();
// run some more code
performance.stop();
```