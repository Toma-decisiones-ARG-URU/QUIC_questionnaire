var jsPsych = initJsPsych();

var pid = new URLSearchParams(window.location.search).get("pid");
jsPsych.data.addProperties({ parent_run_id: pid });

var timeline = [];

// --- 1. FUNCIÓN AYUDANTE (No la borres, dibuja las preguntas automáticamente) ---
function generarPreguntas(listaPreguntas, numeroInicio) {
  let html = '<div style="text-align: left; max-width: 750px; margin: auto;">';
  listaPreguntas.forEach((pregunta, index) => {
    let num = numeroInicio + index;
    html += `
      <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
        <p><strong>${num}.</strong> ${pregunta}</p>
        <label style="margin-right: 20px;"><input type="radio" name="quic_${num}" value="1" required> Sí</label>
        <label><input type="radio" name="quic_${num}" value="0" required> No</label>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

// --- 2. PANTALLA INICIAL: Instrucciones y Relación ---
var quic_intro = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="text-align: left; max-width: 750px; margin: 0 auto 30px auto;">
      <h3>Cuestionario sobre experiencias en la niñez</h3>
      <p>Este es un conjunto de preguntas sobre sus experiencias en la niñez. Cuando decimos padres,
       nos referimos a cualquier persona que desempeñe ese papel en su vida (por ejemplo,
         padres biológicos, padrastros, abuelos, padres de crianza temporal).
          Esto puede ser una o varias personas.</p>
    </div>
  `,
  html: `
    <div style="text-align: left; max-width: 750px; margin: auto; margin-bottom: 30px;">
    <!--<p><strong>Por favor escriba la relación de estas personas hacia usted:</strong></p> -->
      <!-- <input type="text" name="quic_relacion" style="width: 100%; padding: 8px;" required> -->
    </div>
  `,
  button_label: 'Continuar'
};

// --- 3. SECCIÓN 1: Menor de 12 años (Preguntas 1-9) ---
var preguntas_seccion1 = [
  "Tenía una rutina mañanera establecida en los días escolares (por ejemplo, normalmente hacía lo mismo todos los días para prepararme).",
  "Muchas veces mis padres llegaban tarde a recogerme (por ejemplo, de la escuela, del cuidado después de escuela o de deportes).",
  "Mis padres estaban pendientes de lo que comía (por ejemplo, se aseguraban que no me faltara una comida o intentaban asegurarse de que comiera saludable).",
  "La mayoría de los días comíamos en familia.",
  "Mis padres se aseguraban de que durmiera bien por la noche (por ejemplo, tenía un horario regular de ir a dormir, mis padres revisaban que estuviera dormido).",
  "Tenía una rutina antes de acostarme a dormir (por ejemplo, mis padres me cobijaban, me leían un libro, yo tomaba un baño).",
  "Al menos uno de mis padres sabía lo que yo hacía en mis horas después de escuela o en mi tiempo libre.",
  "Normalmente sabía cuándo mis padres iban a estar en casa.",
  "Al menos uno de mis padres regularmente revisaba que yo hiciera mi tarea."
];

var quic_seccion1 = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="text-align: left; max-width: 750px; margin: 0 auto 30px auto;">
      <p>Primero, vamos a preguntarle sobre una parte específica de su niñez, que es cuando usted era menor de 12 años de edad. Estas respuestas deben ser basadas en sus propios recuerdos antes de los 12 años de edad, no en cosas que usted aprendió de sus padres o de otras personas.</p>
      <p><strong>Por favor responda a estas preguntas basándose en sus experiencias cotidianas (típicas) o promedio.</strong></p>
    </div>
  `,
  html: generarPreguntas(preguntas_seccion1, 1),
  button_label: 'Continuar'
};

// --- 4. SECCIÓN 2: Nacimiento a 18 años (Preguntas 10-30) ---
var preguntas_seccion2 = [
  "Al menos uno de mis padres estaba pendiente de mi progreso en la escuela.",
  "Al menos uno de mis padres tenía castigos que eran impredecibles.",
  "Muchas veces me preguntaba si alguno de mis padres volvería a casa al final del día.",
  "Muchas veces había gente entrando y saliendo de mi casa que yo no me esperaba que estuvieran ahí.",
  "Al menos uno de mis padres hacía tiempo para ver cómo yo estaba todos los días.",
  "Mi familia planeaba actividades para hacer juntos.",
  "Al menos uno de mis padres planeaba algo para la familia, pero después no llevaba el plan a cabo.",
  "Mi familia tenía tradiciones en las fiestas que hacíamos todos los años (por ejemplo, cocinaba comida especial a cierta época del año/decoraba la casa de una cierta manera).",
  "Hubo un largo periodo de tiempo cuando no vi a uno de mis padres (por ejemplo, despliegue militar, tiempo en la cárcel, acuerdo de mi custodia).",
  "Experimenté cambios en el acuerdo de mi custodia.",
  "Me mudé frecuentemente.",
  "Al menos uno de mis padres frecuentemente cambiaba de trabajo.",
  "Hubo un tiempo cuando uno de mis padres estaba desempleado y no podía encontrar trabajo aunque el/ella quería.",
  "Hubo un periodo de tiempo en el que muchas veces me preocupé de no tener suficiente comida para comer.",
  "Hubo un periodo de tiempo en el que muchas veces me preocupé de que mi familia no tuviera suficiente dinero para pagar por necesidades como ropa o pagos.",
  "Hubo un periodo de tiempo en el que no me sentí seguro en mi hogar.",
  "Cambié frecuentemente de escuelas.",
  "Cambié de escuelas a mitad del año.",
  "Mis padres tenían una relación estable.",
  "Mis padres se divorciaron.",
  "Al menos uno de mis padres tenía muchas parejas románticas."
];

var quic_seccion2 = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="text-align: left; max-width: 750px; margin: 0 auto 30px auto;">
      <p>Ahora le vamos a preguntar sobre sus experiencias desde su nacimiento a la edad de 18 años (o toda su vida, si usted es menor de 18 años de edad). Nuevamente, esto debe de basarse en sus propios recuerdos antes de los 18 años, no en cosas que usted aprendió de sus padres o de otras personas.</p>
      <p><strong>Por favor responda a estas preguntas basándose en sus experiencias cotidianas (típicas) o experiencias promedio.</strong></p>
    </div>
  `,
  html: generarPreguntas(preguntas_seccion2, 10),
  button_label: 'Continuar'
};

// --- 5. SECCIÓN 3: Padres (Preguntas 31-35) ---
var preguntas_seccion3 = [
  "Al menos uno de mis padres era desorganizado.",
  "Al menos uno de mis padres era impredecible.",
  "Para al menos uno de mis padres, cuando ellos estaban molestos no sabía cómo ellos iban a actuar.",
  "Uno de mis padres podría pasar en un instante de la calma a la furia.",
  "Uno de mis padres podría pasar en un instante de la calma al estrés y los nervios."
];

var quic_seccion3 = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="text-align: left; max-width: 750px; margin: 0 auto 30px auto;">
      <p>Para el siguiente conjunto de preguntas, le estamos preguntando si esto es cierto para al menos uno de sus padres.</p>
      <p><strong>Por favor responda a estas preguntas basándose en sus experiencias cotidianas (típicas) o promedio.</strong></p>
    </div>
  `,
  html: generarPreguntas(preguntas_seccion3, 31),
  button_label: 'Continuar'
};

// --- 6. SECCIÓN 4: Hogar (Preguntas 36-38) ---
var preguntas_seccion4 = [
  "Vivía en una casa limpia.",
  "Vivía en una casa desordenada (por ejemplo, montones de cosas por todos lados).",
  "En mi casa las cosas que necesitaba muchas veces no estaban en su lugar, y no las podía encontrar."
];

var quic_seccion4 = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="text-align: left; max-width: 750px; margin: 0 auto 30px auto;">
      <p>Para el siguiente conjunto de preguntas, le estamos preguntando sobre su hogar. Si usted vivió en más de un hogar, por favor responda sobre el hogar en el cuál usted pasó la mayor parte del tiempo.</p>
      <p><strong>Por favor responda estas preguntas basándose en sus experiencias cotidianas (típicas) o promedio.</strong></p>
    </div>
  `,
  html: generarPreguntas(preguntas_seccion4, 36),
  button_label: 'Finalizar'
};

// No olvides agregar 'quic_sp_5_trial' a tu timeline al final del archivo:
// timeline.push(demographics_trial, educational_level_trial, macarthur_scale_trial, quic_sp_5_trial);

// Add both to your timeline
// timeline.push(age_exact_trial, age_group_trial);

timeline.push(
  quic_intro, 
  quic_seccion1, 
  quic_seccion2, 
  quic_seccion3, 
  quic_seccion4
);

jsPsych.run(timeline);