(function(){
var f=document.getElementById('bmi-form');if(!f)return;
var out=document.getElementById('bmi-result'),err=document.getElementById('bmi-error'),mk=document.getElementById('bmi-marker');
var cats=[[18.5,'Underweight','under','A BMI below 18.5 is considered underweight. If this is unintended, consider speaking with a health professional.'],[25,'Healthy weight','healthy','This is within the healthy weight range for adults.'],[30,'Overweight','over','A BMI of 25 to 29.9 is considered overweight. Context such as muscle mass and waist size matters.'],[Infinity,'Obesity','obese','A BMI of 30 or above is classed as obesity. Consider discussing it with a health professional.']];
function unit(){return f.querySelector('input[name=unit]:checked').value}
function val(id){var v=document.getElementById(id).value.trim();return v===''?NaN:Number(v)}
function setBad(ids){f.querySelectorAll('input[type=number]').forEach(function(i){i.removeAttribute('aria-invalid')});ids.forEach(function(id){document.getElementById(id).setAttribute('aria-invalid','true')})}
function clear(){out.className='result';out.textContent='';err.textContent='';mk.classList.remove('on');setBad([])}
function show(){var m=unit()==='metric';f.querySelectorAll('[data-u=metric]').forEach(function(e){e.hidden=!m});f.querySelectorAll('[data-u=imperial]').forEach(function(e){e.hidden=m});clear()}
f.querySelectorAll('input[name=unit]').forEach(function(r){r.addEventListener('change',show)});
f.addEventListener('reset',function(){setTimeout(function(){show();document.getElementById('cm').focus()},0)});
f.addEventListener('submit',function(e){
e.preventDefault();clear();var m=unit()==='metric',bad=[],msgs=[],bmi,lo,hi,u;
function chk(id,v,min,max,name,unitName){if(!isFinite(v)||v<min||v>max){bad.push(id);msgs.push(name+' must be a number between '+min+' and '+max+' '+unitName+'.')}}
if(m){var cm=val('cm'),kg=val('kg');chk('cm',cm,50,272,'Height','cm');chk('kg',kg,10,635,'Weight','kg');
if(!bad.length){var m2=Math.pow(cm/100,2);bmi=kg/m2;lo=18.5*m2;hi=24.9*m2;u='kg'}}
else{var ft=val('ft'),inch=val('inch'),lb=val('lb');if(isNaN(inch)&&!isNaN(ft))inch=0;chk('ft',ft,0,8,'Feet','ft');chk('inch',inch,0,11.99,'Inches','in');chk('lb',lb,22,1400,'Weight','lb');
if(!bad.length){var tot=ft*12+inch;if(tot<20||tot>107){bad.push('ft','inch');msgs.push('Total height must be between 20 and 107 inches.')}else{var i2=tot*tot;bmi=703*lb/i2;lo=18.5*i2/703;hi=24.9*i2/703;u='lb'}}}
if(bad.length){setBad(bad);err.textContent=msgs.join(' ');document.getElementById(bad[0]).focus();return}
if(!isFinite(bmi)||bmi<=0){err.textContent='Could not calculate. Please check your values.';return}
var c=cats.find(function(x){return bmi<x[0]}),r=Math.round(bmi*10)/10;
if(r>=25&&c[2]==='healthy')c=cats[2];
out.className='result show';
out.innerHTML='<p class="num">'+r.toFixed(1)+'</p><p class="badge '+c[2]+'">'+c[1]+'</p><p>'+c[3]+'</p><p>Healthy weight range for your height (BMI 18.5–24.9): <strong>'+lo.toFixed(1)+' to '+hi.toFixed(1)+' '+u+'</strong>.</p>';
mk.style.left='calc('+Math.min(Math.max((bmi-10)/30,0),1)*100+'% - 2px)';mk.classList.add('on');out.focus();
});
})();