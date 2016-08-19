<div class='input checkbox %%name%%'> 	
		<input type='checkbox' name='%%name%%' id='%%id%%' data-field='%%name%%' 
			{if:inputclass}class="%%inputclass%%"{/if:inputclass} 
			value='%%value%%' 
			%%checked%% 
		/>
		<label for='%%id%%' {if:title}title="%%title%%"{/if:title} >
		{if:icon}	<i class='dashicons %%icon%%'></i>	{/if:icon}
		{if:label}	%%label%% {/if:label}	
		</label>
</div>
